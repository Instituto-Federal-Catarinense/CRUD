const Produto = require('../models/produtoModel');

const produtoController = {
    createProduto: (req, res) => {
        const newProduto = {
            Descricao: req.body.Descricao,
            DataValidade: req.body.DataValidade,
            DataFabricacao: req.body.DataFabricacao,
            PrecisaRefrigeracao: req.body.PrecisaRefrigeracao,
            QuantidadeEstoque: req.body.QuantidadeEstoque,
            COD: req.body.COD,
            ItemID: req.body.ItemID
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
                return res.status(404).json({ message: 'Produto not found' });
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
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/edit', { produto });
        });
    },

    updateProduto: (req, res) => {
        const produtoId = req.params.id;
        const updatedProduto = {
            Descricao: req.body.Descricao,
            DataValidade: req.body.DataValidade,
            DataFabricacao: req.body.DataFabricacao,
            PrecisaRefrigeracao: req.body.PrecisaRefrigeracao,
            QuantidadeEstoque: req.body.QuantidadeEstoque,
            COD: req.body.COD,
            ItemID: req.body.ItemID
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
    }
};

module.exports = produtoController;
