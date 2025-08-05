const db = require('../config/db');

const ProdutoService = {
  create: async (produto) => {
    try {
      const newProduto = await Produto.create({
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        quantidade: produto.quantidade,
        categoria: produto.categoria,
      });
      return newProduto.id;
    } catch (err) {
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const produto = await Produto.findOne({
        where: { id },
        include: {
          model: Categoria,
          as: 'categoria',
          attributes: ['nome'],
        },
      });
      return produto;
    } catch (err) {
      throw err;
    }
  },

  update: async (id, produto) => {
    try {
      await Produto.update(produto, { where: { id } });
      return id;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await Produto.destroy({ where: { id } });
      return id;
    } catch (err) {
      throw err;
    }
  },

  getAll: async (categoria) => {
    try {
      const whereClause = categoria ? { categoria } : {};
      const produtos = await Produto.findAll({
        where: whereClause,
        include: {
          model: Categoria,
          as: 'categoria',
          attributes: ['nome'],
        },
      });
      return produtos;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = ProdutoService;
