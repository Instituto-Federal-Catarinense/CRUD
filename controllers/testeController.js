const { Op } = require('sequelize');
const Teste = require('../models/testeModel');

const testeController = {
  // Renderiza o formulário para criar um novo teste
  renderCreateForm: (req, res) => {
    res.render('teste/create');
  },

  // Cria um novo teste no banco de dados
  createTeste: async (req, res) => {
    try {
      const newTeste = {
        nome: req.body.nome,
        descricao: req.body.descricao,
      };

      // Validação simples antes de salvar no banco
      if (!newTeste.nome || !newTeste.descricao) {
        return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
      }

      await Teste.create(newTeste);
      res.redirect('/teste');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Busca um teste pelo ID e o renderiza
  getTesteById: async (req, res) => {
    try {
      const testeId = req.params.id;
      const teste = await Teste.findByPk(testeId);

      if (!teste) {
        return res.status(404).json({ message: 'Teste não encontrado' });
      }

      res.render('teste/show', { teste });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Busca todos os testes e renderiza a lista
  getAllTeste: async (req, res) => {
    try {
      const teste = await Teste.findAll();
      res.render('teste/index', { teste });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Renderiza o formulário de edição para um teste
  renderEditForm: async (req, res) => {
    try {
      const testeId = req.params.id;
      const teste = await Teste.findByPk(testeId);

      if (!teste) {
        return res.status(404).json({ message: 'Teste não encontrado' });
      }

      res.render('teste/edit', { teste });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualiza os dados de um teste existente
  updateTeste: async (req, res) => {
    try {
      const testeId = req.params.id;
      const updatedTeste = {
        nome: req.body.nome,
        descricao: req.body.descricao,
      };

      // Validação simples
      if (!updatedTeste.nome || !updatedTeste.descricao) {
        return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
      }

      const [updatedRows] = await Teste.update(updatedTeste, {
        where: { id: testeId },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Teste não encontrado' });
      }

      res.redirect('/teste');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deleta um teste
  deleteTeste: async (req, res) => {
    try {
      const testeId = req.params.id;
      const deletedRows = await Teste.destroy({
        where: { id: testeId },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Teste não encontrado' });
      }

      res.redirect('/teste');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Busca testes com base no nome, utilizando LIKE
  searchTeste: async (req, res) => {
    try {
      const search = req.query.search || '';

      const teste = await Teste.findAll({
        where: {
          nome: {
            [Op.like]: `%${search}%`, // Buscando pelo nome com LIKE
          },
        },
      });

      res.json({ teste });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = testeController;
