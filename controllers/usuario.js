const { Usuario } = require('../models');

module.exports = {
  async listar(req, res) {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  },

  async criar(req, res) {
    const novo = await Usuario.create(req.body);
    res.status(201).json(novo);
  },

  async atualizar(req, res) {
    await Usuario.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  },

  async deletar(req, res) {
    await Usuario.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  }
};
