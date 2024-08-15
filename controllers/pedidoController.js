const Pedido = require('../models/pedidoModel');

const pedidoController = {
    createPedido: (req, res) => {
        const newPedido = {
            Quantidade: req.body.Quantidade,
            Descricao: req.body.Descricao,
            COD: req.body.COD,
            ItemID: req.body.ItemID
        };

        Pedido.create(newPedido, (err, pedidoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pedidos');
        });
    },

    getPedidoById: (req, res) => {
        const pedidoId = req.params.id;

        Pedido.findById(pedidoId, (err, pedido) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido not found' });
            }
            res.render('pedidos/show', { pedido });
        });
    },

    getAllPedidos: (req, res) => {
        Pedido.getAll((err, pedidos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('pedidos/index', { pedidos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('pedidos/create');
    },

    renderEditForm: (req, res) => {
        const pedidoId = req.params.id;

        Pedido.findById(pedidoId, (err, pedido) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido not found' });
            }
            res.render('pedidos/edit', { pedido });
        });
    },

    updatePedido: (req, res) => {
        const pedidoId = req.params.id;
        const updatedPedido = {
            Quantidade: req.body.Quantidade,
            Descricao: req.body.Descricao,
            COD: req.body.COD,
            ItemID: req.body.ItemID
        };

        Pedido.update(pedidoId, updatedPedido, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pedidos');
        });
    },

    deletePedido: (req, res) => {
        const pedidoId = req.params.id;

        Pedido.delete(pedidoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/pedidos');
        });
    }
};

module.exports = pedidoController;
