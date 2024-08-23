const Produto = require('../models/produtoModel');

const produtoController = {
    createProduto: (req, res) => {
        const newProduto = {
            produtoname: req.body.produtoname,
            produtoquant: req.body.produtoquant,
            produtopreco: req.body.produtopreco,
        };

        Produto.create(newProduto, (err, produtoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    getProdutoById: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/show', { produto });
        });
    },

    getAllProdutos: (req, res) => {
        Produto.getAll((err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('produtos/index', { produtos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    renderEditForm: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.render('produtos/edit', { produto });
        });
    },

    updateProduto: (req, res) => {
        const produtoId = req.params.id;
        const updatedProduto = {
            produtoname: req.body.produtoname,
            produtoquant: req.body.produtoquant,
            produtopreco: req.body.produtopreco,
        };

        Produto.update(produtoId, updatedProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    deleteProduto: (req, res) => {
        const produtoId = req.params.id;

        Produto.delete(produtoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },
};

module.exports = produtoController;
