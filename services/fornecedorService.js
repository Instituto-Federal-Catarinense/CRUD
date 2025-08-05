// services/fornecedorService.js
const Fornecedor = require('../models/Fornecedor');

const FornecedorService = {
    create: async (fornecedor) => {
        const novoFornecedor = await Fornecedor.create({ nome: fornecedor.nome });
        return novoFornecedor.id;
    },

    findById: async (id) => {
        return await Fornecedor.findByPk(id);
    },

    findByFornecedorname: async (nome) => {
        return await Fornecedor.findOne({ where: { nome } });
    },

    update: async (id, fornecedor) => {
        await Fornecedor.update(
            { nome: fornecedor.nome },
            { where: { id } }
        );
        return await Fornecedor.findByPk(id); // retorna o registro atualizado
    },

    delete: async (id) => {
        return await Fornecedor.destroy({ where: { id } });
    },

    getAll: async () => {
        return await Fornecedor.findAll();
    },
};

module.exports = FornecedorService;
