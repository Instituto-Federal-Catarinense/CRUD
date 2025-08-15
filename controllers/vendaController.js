const Venda = require('../models/vendaModel');

const vendaController = {
    createVenda: async (req, res) => {
        try {
            await Venda.create({
                data: req.body.data,
                valor: req.body.valor,
                quantidade: req.body.quantidade,
                produto_id: req.body.produto_id,
            });
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getVendaById: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.render('vendas/show', { venda });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllVendas: async (req, res) => {
        try {
            const vendas = await Venda.findAll();
            res.render('vendas/index', { vendas });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('vendas/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.render('vendas/edit', { venda });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateVenda: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            await venda.update({
                data: req.body.data,
                valor: req.body.valor,
                quantidade: req.body.quantidade,
                produto_id: req.body.produto_id,
            });
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteVenda: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            await venda.destroy();
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};