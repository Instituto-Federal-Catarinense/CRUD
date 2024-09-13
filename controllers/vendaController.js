const Venda = require('../models/vendaModel');

const vendaController = {
    createVenda: (req, res) => {
        const newVenda = {
            data: req.body.data,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            produto_id: req.body.produto_id,
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
        res.render('vendas/create');
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
            res.render('vendas/edit', { venda });
        });
    },

    updateVenda: (req, res) => {
        const vendaId = req.params.id;
        const updatedVenda = {
            data: req.body.data,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            produto_id: req.body.produto_id,
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
