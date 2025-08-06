const { Produto, Categoria } = require('../models');

module.exports = {
  async listar(req, res) {
    const produtos = await Produto.findAll({ include: Categoria });
    res.json(produtos);
  },

  async criar(req, res) {
    const novo = await Produto.create(req.body);
    res.status(201).json(novo);
  },

  async atualizar(req, res) {
    await Produto.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Produto.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  }
};
