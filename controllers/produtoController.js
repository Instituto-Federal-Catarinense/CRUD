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
            res.status(500).json({ error: err });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id, {
                include: [{ model: Categoria }]
            });
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/show', { produto });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
    
    getAllProdutos: async (req, res) => {
        try {
            const categoria = req.query.categoria || null;
            const categorias = await Categoria.findAll();
            let produtos;
            if (categoria) {
                produtos = await Produto.findAll({
                    where: { categoria },
                    include: [{ model: Categoria }]
                });
            } else {
                produtos = await Produto.findAll({
                    include: [{ model: Categoria }]
                });
            }
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

    renderEditForm: async (req, res) => {
        try {
            const produto = await Produto.findByPk(req.params.id);
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
            await Produto.update(
                {
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    preco: req.body.preco,
                    quantidade: req.body.quantidade,
                    categoria: req.body.categoria
                },
                { where: { id: req.params.id } }
            );
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            await Produto.destroy({ where: { id: req.params.id } });
            res.redirect('/produtos');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};

module.exports = produtoController;