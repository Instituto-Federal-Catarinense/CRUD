// services/categoriaService.js
const Categoria = require('../models/Categoria');

const CategoriaService = {
    create: async (categoria) => {
        const novaCategoria = await Categoria.create({ nome: categoria.nome });
        return novaCategoria.id;
    },

    findById: async (id) => {
        return await Categoria.findByPk(id);
    },

    findByCategorianame: async (nome) => {
        return await Categoria.findOne({ where: { nome } });
    },

    update: async (id, categoria) => {
        await Categoria.update({ nome: categoria.nome }, { where: { id } });
        return await Categoria.findByPk(id); // retorna categoria atualizada
    },

    delete: async (id) => {
        return await Categoria.destroy({ where: { id } });
    },

    getAll: async () => {
        return await Categoria.findAll();
    },
};

module.exports = CategoriaService;
