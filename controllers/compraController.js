const Compra = require('../models/compraModel');

const compraController = {
    // Cria uma nova compra
    createCompra: (req, res) => {
        const newCompra = {
            ClienteID: req.body.ClienteID,
            PedidoID: req.body.PedidoID,
            DataCompra: req.body.DataCompra
        };

        Compra.create(newCompra, (err, compraId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/compras');
        });
    },

    // Obtém uma compra por ID
    getCompraById: (req, res) => {
        const compraId = req.params.id;

        Compra.findById(compraId, (err, compra) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!compra) {
                return res.status(404).json({ message: 'Compra not found' });
            }
            res.render('compras/show', { compra });
        });
    },

    // Obtém todas as compras
    getAllCompras: (req, res) => {
        Compra.getAll((err, compras) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('compras/index', { compras });
        });
    },

    // Renderiza o formulário de criação de compra
    renderCreateForm: (req, res) => {
        res.render('compras/create');
    },

    // Renderiza o formulário de edição de compra
    renderEditForm: (req, res) => {
        const compraId = req.params.id;

        Compra.findById(compraId, (err, compra) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!compra) {
                return res.status(404).json({ message: 'Compra not found' });
            }
            res.render('compras/edit', { compra });
        });
    },

    // Atualiza uma compra existente
    updateCompra: (req, res) => {
        const compraId = req.params.id;
        const updatedCompra = {
            ClienteID: req.body.ClienteID,
            PedidoID: req.body.PedidoID,
            DataCompra: req.body.DataCompra
        };

        Compra.update(compraId, updatedCompra, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/compras');
        });
    },

    // Exclui uma compra
    deleteCompra: (req, res) => {
        const compraId = req.params.id;

        Compra.delete(compraId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/compras');
        });
    }
};

module.exports = compraController;
