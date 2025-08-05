const db = require('../config/db');

const VendaService = {
  create: async (venda) => {
    try {
      const newVenda = await Venda.create({
        data: venda.data,
        valor: venda.valor,
        quantidade: venda.quantidade,
        produto_id: venda.produto_id,
      });
      return newVenda.id;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const vendas = await Venda.findAll();
      return vendas;
    } catch (err) {
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const venda = await Venda.findByPk(id);
      return venda;
    } catch (err) {
      throw err;
    }
  },

  update: async (id, venda) => {
    try {
      await Venda.update(venda, { where: { id } });
      return id;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await Venda.destroy({ where: { id } });
      return id;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = VendaService;
