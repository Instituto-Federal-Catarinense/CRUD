const db = require('../config/db');

const CategoriaService = {
  create: async (categoria) => {
    try {
      const newCategoria = await Categoria.create({ nome: categoria.nome });
      return newCategoria.id;
    } catch (err) {
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const categoria = await Categoria.findByPk(id);
      return categoria;
    } catch (err) {
      throw err;
    }
  },

  findByCategorianame: async (nome) => {
    try {
      const categoria = await Categoria.findOne({ where: { nome } });
      return categoria;
    } catch (err) {
      throw err;
    }
  },

  update: async (id, categoria) => {
    try {
      await Categoria.update(categoria, { where: { id } });
      return id;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await Categoria.destroy({ where: { id } });
      return id;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const categorias = await Categoria.findAll();
      return categorias;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = CategoriaService;
