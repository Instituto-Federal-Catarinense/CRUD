const Cor = require('../models/corModel');

const corController = {
  // Formulário de criação
  renderCreateForm: (req, res) => {
    res.render('cores/create');
  },

  // Cria uma nova cor
  createCor: async (req, res) => {
    try {
      await Cor.create({ nome: req.body.nome });
      res.redirect('/cores');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lista todas as cores
  getAllCores: async (req, res) => {
    try {
      const cores = await Cor.findAll();
      res.render('cores/index', { cores });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Formulário de edição
  renderEditForm: async (req, res) => {
    try {
      const cor = await Cor.findByPk(req.params.id);
      if (!cor) return res.status(404).json({ message: 'Cor não encontrada' });
      res.render('cores/edit', { cor });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza cor
  updateCor: async (req, res) => {
    try {
      await Cor.update(
        { nome: req.body.nome },
        { where: { id: req.params.id } }
      );
      res.redirect('/cores');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mostra uma cor por ID
  getCorById: async (req, res) => {
    try {
      const cor = await Cor.findByPk(req.params.id);
      if (!cor) return res.status(404).json({ message: 'Cor não encontrada' });
      res.render('cores/show', { cor });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta cor
  deleteCor: async (req, res) => {
    try {
      await Cor.destroy({ where: { id: req.params.id } });
      res.redirect('/cores');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = corController;
