const Fornecedor = require('../models/fornecedorModel');

const fornecedorController = {
    createFornecedor: (req, res) => {
        const newFornecedor = {
            CNPJ_CPF: req.body.CNPJ_CPF,
            Nome: req.body.Nome,
            Telefone: req.body.Telefone,
            Email: req.body.Email
        };

        Fornecedor.create(newFornecedor, (err, fornecedorId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    },

    getFornecedorById: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.findById(fornecedorId, (err, fornecedor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            res.render('fornecedores/show', { fornecedor });
        });
    },

    getAllFornecedores: (req, res) => {
        Fornecedor.getAll((err, fornecedores) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('fornecedores/index', { fornecedores });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('fornecedores/create');
    },

    renderEditForm: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.findById(fornecedorId, (err, fornecedor) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            res.render('fornecedores/edit', { fornecedor });
        });
    },

    updateFornecedor: (req, res) => {
        const fornecedorId = req.params.id;
        const updatedFornecedor = {
            CNPJ_CPF: req.body.CNPJ_CPF,
            Nome: req.body.Nome,
            Telefone: req.body.Telefone,
            Email: req.body.Email
        };

        Fornecedor.update(fornecedorId, updatedFornecedor, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    },

    deleteFornecedor: (req, res) => {
        const fornecedorId = req.params.id;

        Fornecedor.delete(fornecedorId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/fornecedores');
        });
    }
};

module.exports = fornecedorController;
