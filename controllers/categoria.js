const { Categoria } = require('../models');

module.exports = {
  async listar(req, res) {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  },

  async criar(req, res) {
    const nova = await Categoria.create(req.body);
    res.status(201).json(nova);
  },

  async atualizar(req, res) {
    await Categoria.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Categoria.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  }
};
