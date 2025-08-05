const { Venda } = require('../models/vendaModel');

const vendaController = {
    renderCreateForm: (req, res) => {
        res.render('vendas/create');
    },

    createVenda: async (req, res) => {
        try {
            const novaVenda = { 
                data: req.body.data, 
                valor: req.body.valor, 
                quantidade: req.body.quantidade, 
                produto_id: req.body.produto_id 
            };
            await Venda.create(novaVenda);
            res.redirect('/vendas');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    getAllVendas: async (req, res) => {
        try {
            const vendas = await Venda.findAll();
            res.render('vendas/index', { vendas });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    getVendaById: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.render('vendas/show', { venda });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.render('vendas/edit', { venda });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    updateVenda: async (req, res) => {
        try {
            const vendaAtualizada = { ...req.body };
            await Venda.update(vendaAtualizada, { where: { id: req.params.id } });
            res.redirect('/vendas');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    deleteVenda: async (req, res) => {
        try {
            await Venda.destroy({ where: { id: req.params.id } });
            res.redirect('/vendas');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

module.exports = vendaController;
