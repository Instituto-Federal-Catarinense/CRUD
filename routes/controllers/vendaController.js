const Venda = require('../models/vendaModel.js');
const Produto = require('../models/produtoModel.js');

const vendaController = {
    createVenda: async (req, res) => {
        try {
            await Venda.create({
                data: req.body.data,
                valor: req.body.valor,
                quantidade: req.body.quantidade,
                produto_id: req.body.produto_id
            });
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getVendaById: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id, {
                include: [{ model: Produto, as: 'produtoInfo' }]
            });
            if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });
            res.render('vendas/show', { venda });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllVendas: async (req, res) => {
        try {
            const vendas = await Venda.findAll({
                include: [{ model: Produto, as: 'produtoInfo' }]
            });
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
            if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });
            res.render('vendas/edit', { venda });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateVenda: async (req, res) => {
        try {
            await Venda.update({
                data: req.body.data,
                valor: req.body.valor,
                quantidade: req.body.quantidade,
                produto_id: req.body.produto_id
            }, { where: { id: req.params.id } });
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteVenda: async (req, res) => {
        try {
            await Venda.destroy({ where: { id: req.params.id } });
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = vendaController;
