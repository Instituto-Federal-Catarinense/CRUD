const { Venda } = require('../models');

const vendaController = {
    // Criar uma nova venda
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

    // Obter venda por ID
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

    // Obter todas as vendas
    getAllVendas: async (req, res) => {
        try {
            const vendas = await Venda.findAll();
            res.render('vendas/index', { vendas });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Renderizar formulário de criação
    renderCreateForm: (req, res) => {
        res.render('vendas/create');
    },

    // Renderizar formulário de edição
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

    // Atualizar venda
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

    // Deletar venda
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

module.exports = vendaController;