const Categoria = require('../models/categoriaModel');

const categoriaController = {
  // Renderiza o formulário de criação
  renderCreateForm: (req, res) => {
    res.render('categorias/create');
  },

  // Cria uma nova categoria
  createCategoria: async (req, res) => {
    try {
      await Categoria.create({ nome: req.body.nome });
      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lista todas as categorias
  getAllCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.render('categorias/index', { categorias });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Renderiza o formulário de edição
  renderEditForm: async (req, res) => {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
      res.render('categorias/edit', { categoria });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza a categoria
  updateCategoria: async (req, res) => {
    try {
      await Categoria.update(
        { nome: req.body.nome },
        { where: { id: req.params.id } }
      );
      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mostra uma categoria pelo ID
  getCategoriaById: async (req, res) => {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
      res.render('categorias/show', { categoria });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta uma categoria
  deleteCategoria: async (req, res) => {
    try {
      await Categoria.destroy({ where: { id: req.params.id } });
      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = categoriaController;
