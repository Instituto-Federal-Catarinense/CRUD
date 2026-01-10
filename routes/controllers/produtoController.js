const Produto = require('../models/produtoModel.js');
const Categoria = require('../models/categoriaModel.js');

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
            const produto = await Produto.findByPk(req.params.id, {
                include: [{ model: Categoria, as: 'categoriaInfo' }]
            });
            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            const where = categoria ? { categoria } : {};
            const produtos = await Produto.findAll({
                where,
                include: [{ model: Categoria, as: 'categoriaInfo' }]
            });
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
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
            const categorias = await Categoria.findAll();
            res.render('produtos/edit', { produto, categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProduto: async (req, res) => {
        try {
            await Produto.update({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria
            }, { where: { id: req.params.id } });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            await Produto.destroy({ where: { id: req.params.id } });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = produtoController;
