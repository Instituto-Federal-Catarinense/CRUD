const Cliente = require('../models/clienteModel');

const clienteController = {
    createCliente: (req, res) => {
        const newCliente = {
            CPF: req.body.CPF,
            Nome: req.body.Nome,
            Telefone: req.body.Telefone,
            Email: req.body.Email
        };

        Cliente.create(newCliente, (err, clienteId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    getClienteById: (req, res) => {
        const clienteId = req.params.id;

        Cliente.findById(clienteId, (err, cliente) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente not found' });
            }
            res.render('clientes/show', { cliente });
        });
    },

    getAllClientes: (req, res) => {
        Cliente.getAll((err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('clientes/index', { clientes });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('clientes/create');
    },

    renderEditForm: (req, res) => {
        const clienteId = req.params.id;

        Cliente.findById(clienteId, (err, cliente) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente not found' });
            }
            res.render('clientes/edit', { cliente });
        });
    },

    updateCliente: (req, res) => {
        const clienteId = req.params.id;
        const updatedCliente = {
            CPF: req.body.CPF,
            Nome: req.body.Nome,
            Telefone: req.body.Telefone,
            Email: req.body.Email
        };

        Cliente.update(clienteId, updatedCliente, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    deleteCliente: (req, res) => {
        const clienteId = req.params.id;

        Cliente.delete(clienteId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    }
};

module.exports = clienteController;
