const Produto = require('../models/produto');
const Categoria = require('../models/categoria');

const produtoController = {
    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            const where = categoria ? { categoria } : {};
            const produtos = await Produto.findAll({
                where,
                include: [{ model: Categoria, attributes: ['nome'] }]
            });
            const categorias = await Categoria.findAll();
            res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('produtos/create', { categorias });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    createProduto: async (req, res) => {
        try {
            const newProduto = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria
            };
            await Produto.create(newProduto);
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findByPk(produtoId, {
                include: [{ model: Categoria, attributes: ['nome'] }]
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err });
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
            res.status(500).json({ error: err });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const updatedProduto = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria
            };
            await Produto.update(updatedProduto, { where: { id: produtoId } });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            await Produto.destroy({ where: { id: produtoId } });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};

module.exports = produtoController;