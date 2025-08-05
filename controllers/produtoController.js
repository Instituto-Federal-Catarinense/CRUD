const { Produto, Categoria } = require('../models/produtoModel');

const produtoController = {
    createProduto: async (req, res) => {
        try {
            const { nome, descricao, preco, quantidade, categoria } = req.body;
            const newProduto = { nome, descricao, preco, quantidade, categoria };
            await Produto.create(newProduto);
            res.redirect('/produtos');
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id, {
                include: { model: Categoria, as: 'categoria' }
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            const produtos = await Produto.findAll({
                where: categoria ? { categoria } : {},
                include: { model: Categoria, as: 'categoria' }
            });
            const categorias = await Categoria.findAll();
            res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('produtos/create', { categorias });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            const categorias = await Categoria.findAll();
            res.render('produtos/edit', { produto, categorias });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const updatedProduto = { ...req.body };
            await Produto.update(updatedProduto, { where: { id: req.params.id } });
            res.redirect('/produtos');
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            await Produto.destroy({ where: { id: req.params.id } });
            res.redirect('/produtos');
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }
};

module.exports = produtoController;
