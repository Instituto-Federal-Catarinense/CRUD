
const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {
    createProduto: async (req, res) => {
        try {
            await Produto.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria
            });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            let produtos;
            if (categoria) {
                produtos = await Produto.findAll({ where: { categoria } });
            } else {
                produtos = await Produto.findAll();
            }
            const categorias = await Categoria.findAll();
            res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('produtos/create', { categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            const categorias = await Categoria.findAll();
            res.render('produtos/edit', { produto, categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            await Produto.update({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria
            }, { where: { id: produtoId } });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            await Produto.destroy({ where: { id: produtoId } });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtoController;