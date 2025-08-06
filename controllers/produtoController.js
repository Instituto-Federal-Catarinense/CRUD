const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');
const Cor = require('../models/corModel');

const produtoController = {

  createProduto: async (req, res) => {
    try {
      const newProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
        categoria: req.body.categoria,
        cor_id: req.body.cor,
      };
      await Produto.create(newProduto);
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProdutoById: async (req, res) => {
    try {
      const produtoId = req.params.id;

      const produto = await Produto.findOne({
        where: { id: produtoId },
        include: [
          { model: Categoria, as: 'categoriaInfo', attributes: ['nome'] },
          { model: Cor, as: 'corInfo', attributes: ['nome'] },
        ],
      });

      if (!produto) {
        return res.status(404).json({ message: 'Produto not found' });
      }
      res.render('produtos/show', { produto });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllProdutos: async (req, res) => {
    try {
      const categoria = req.query.categoria || null;

      const whereClause = {};
      if (categoria) {
        whereClause.categoria = categoria;
      }

      const produtos = await Produto.findAll({
        where: whereClause,
        include: [
          { model: Categoria, as: 'categoriaInfo', attributes: ['nome'] },
          { model: Cor, as: 'corInfo', attributes: ['nome'] },
        ],
      });

      const categorias = await Categoria.findAll();
      const cores = await Cor.findAll();

      res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria, cores });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderCreateForm: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      const cores = await Cor.findAll();
      res.render('produtos/create', { categorias, cores });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderEditForm: async (req, res) => {
    try {
      const produtoId = req.params.id;
      const produto = await Produto.findByPk(produtoId);

      if (!produto) {
        return res.status(404).json({ message: 'Produto not found' });
      }

      const categorias = await Categoria.findAll();
      const cores = await Cor.findAll();

      res.render('produtos/edit', { produto, categorias, cores });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateProduto: async (req, res) => {
    try {
      const produtoId = req.params.id;
      const updatedProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
        categoria: req.body.categoria,
        cor_id: req.body.cor,
      };

      await Produto.update(updatedProduto, { where: { id: produtoId } });
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteProduto: async (req, res) => {
    try {
      const produtoId = req.params.id;
      await Produto.destroy({ where: { id: produtoId } });
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = produtoController;
