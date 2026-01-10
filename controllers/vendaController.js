//crie o conteudo deste arquivo vendaController.js com o seguinte conteudo: tabela de vendas com os campos: id, data, valor, quantidade, produto_id

const { Venda } = require('../models'); // Ajuste conforme seu index.js dos models

const vendaController = {
    createVenda: async (req, res) => {
        try {
            const { data, valor, quantidade, produto_id } = req.body;
            await Venda.create({ data, valor, quantidade, produto_id });
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
            const { data, valor, quantidade, produto_id } = req.body;
            const [updated] = await Venda.update(
                { data, valor, quantidade, produto_id },
                { where: { id: req.params.id } }
            );
            if (!updated) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteVenda: async (req, res) => {
        try {
            const deleted = await Venda.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = vendaController;