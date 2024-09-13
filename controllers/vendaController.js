// controllers/vendaController.js
const Venda = require('../models/vendaModel');
const Produto = require('../models/produtoModel');
const User = require('../models/userModel');

const vendaController = {
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
            User.getAll((err, users) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('vendas/create', { produtos, users });
            });
        });
    },

    createVenda: (req, res) => {
        const newVenda = {
            user_id: req.body.user_id,
            produto_id: req.body.produto_id,
            quantidade: req.body.quantidade,  // Adicione a quantidade
            data_compra: req.body.data_compra // Adicione a data da compra
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

    renderEditForm: (req, res) => {
        const vendaId = req.params.id;

        Venda.findById(vendaId, (err, venda) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            Produto.getAll(null, (err, produtos) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                User.getAll((err, users) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    }
                    res.render('vendas/edit', { venda, produtos, users });
                });
            });
        });
    },

    updateVenda: (req, res) => {
        const vendaId = req.params.id;
        const updatedVenda = {
            user_id: req.body.user_id,
            produto_id: req.body.produto_id,
            quantidade: req.body.quantidade, // Atualize a quantidade
            data_compra: req.body.data_compra // Atualize a data da compra
        };

        Venda.update(vendaId, updatedVenda, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

    deleteVenda: (req, res) => {
        const vendaId = req.params.id;

        Venda.delete(vendaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    }
};

module.exports = vendaController;
