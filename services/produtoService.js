// services/produtoService.js
const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

const ProdutoService = {
    create: async (produto) => {
        const novo = await Produto.create({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            quantidade: produto.quantidade,
            categoria: produto.categoria
        });
        return novo.id;
    },

    findById: async (id) => {
        return await Produto.findByPk(id, {
            include: {
                model: Categoria,
                as: 'categoriaInfo',
                attributes: ['nome']
            }
        });
    },

    update: async (id, produto) => {
        await Produto.update({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            quantidade: produto.quantidade,
            categoria: produto.categoria
        }, {
            where: { id }
        });
        return await Produto.findByPk(id, {
            include: { model: Categoria, as: 'categoriaInfo', attributes: ['nome'] }
        });
    },

    delete: async (id) => {
        return await Produto.destroy({ where: { id } });
    },

    getAll: async (categoria = null) => {
        const whereClause = categoria ? { categoria } : {};
        return await Produto.findAll({
            where: whereClause,
            include: {
                model: Categoria,
                as: 'categoriaInfo',
                attributes: ['nome']
            }
        });
    },
};

module.exports = ProdutoService;
