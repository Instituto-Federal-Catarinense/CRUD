const Venda = require('../models/vendaModel');
const Produto = require('../models/produtoModel');

const vendaController = {
    createVenda: (req, res) => {
        const newVenda = {
            data: req.body.data,
            valor_total: req.body.valor_total, // Alterado para 'valor_total'
            quantidade: req.body.quantidade,
            produto_id: req.body.produto, // Alterado para 'produto_id'
            users_id: req.body.userId, // Alterado para 'users_id'
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
            Produto.getAll(null, (err, produtos) => {
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
            valor_total: req.body.valor_total, // Alterado para 'valor_total'
            quantidade: req.body.quantidade,
            produto_id: req.body.produto, // Alterado para 'produto_id'
            users_id: req.body.userId, // Alterado para 'users_id'
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
    },

    searchVendas: (req, res) => {
        const search = req.query.search || '';

        Venda.searchByProductName(search, (err, vendas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ vendas });
        });
    },
};

module.exports = vendaController;