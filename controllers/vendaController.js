//crie o conteudo deste arquivo vendaController.js com o seguinte conteudo: tabela de vendas com os campos: id, data, valor, quantidade, produto_id

const { Venda, Produto } = require('../models');

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
            const venda = await Venda.findByPk(req.params.id, {
                include: [{ model: Produto, as: 'produtoInfo' }]
            });
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
            const vendas = await Venda.findAll({
                include: [{ model: Produto, as: 'produtoInfo' }]
            });
            res.render('vendas/index', { vendas });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const produtos = await Produto.findAll();
            res.render('vendas/create', { produtos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) {
                return res.status(404).json({ message: 'Venda not found' });
            }
            const produtos = await Produto.findAll();
            res.render('vendas/edit', { venda, produtos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateVenda: async (req, res) => {
        try {
            await Venda.update(
                {
                    data: req.body.data,
                    valor: req.body.valor,
                    quantidade: req.body.quantidade,
                    produto_id: req.body.produto_id,
                },
                { where: { id: req.params.id } }
            );
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