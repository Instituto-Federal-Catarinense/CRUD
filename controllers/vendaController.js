const Venda = require('../models/vendaModel');
const Produto = require('../models/produtoModel');

const vendaController = {

    createVenda: (req, res) => {
        const newVenda = {
            data: req.body.data,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            produto_id: req.body.produto 
        };

        Venda.create(newVenda, (err, vendaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    getVendaById: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.render('vendas/show', { venda });
        });
    },

    getAllVendas: (req, res) => {
        Venda.getAll((err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('vendas/index', { vendas });
        });
    },

    renderCreateForm: (req, res) => {
        Produto.getAll(null, (err, produtos) => { 
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('vendas/create', { produtos });
        });
    },
    

    renderEditForm: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }

            Produto.getAll((err, produtos) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('vendas/edit', { venda, produtos });
            });
        });
    },

    updateVenda: (req, res) => {
        const vendaId = req.params.id;
        const updatedVenda = {
            data: req.body.data,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            produto_id: req.body.produto 
        };

        Venda.update(vendaId, updatedVenda, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    // Delete a sale
    deleteVenda: (req, res) => {
        const vendaId = req.params.id;

        Venda.delete(vendaId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    }
};

module.exports = vendaController;
