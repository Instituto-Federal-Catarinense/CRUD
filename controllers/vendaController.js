//crie o conteudo deste arquivo vendaController.js com o seguinte conteudo: tabela de vendas com os campos: id, data, valor, quantidade, produto_id

const Venda = require('../models/vendaModel');

const vendaController = {
    createVenda: (req, res) => {
        const newVenda = {
            id_produto: req.body.id_produto,
            id_usuario: req.body.id_usuario,
            quantidade: req.body.quantidade,
            data: req.body.data,
            
           
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
            id_produto: req.body.id_produto,
            id_usuario: req.body.id_usuario,
            quantidade: req.body.quantidade,
            data: req.body.data,
        };

        Venda.update(vendaId, updatedVenda, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/vendas');
        });
    },

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