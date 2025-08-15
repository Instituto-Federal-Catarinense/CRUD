const { Categoria } = require('../models');

const fornecedorController = {
    createFornecedor: async (req, res) => {
        try {
            await Fornecedor.create({ nome: req.body.nome });
            res.redirect('/fornecedores');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getFornecedorById: async (req, res) => {
        try {
            const fornecedor = await Fornecedor.findByPk(req.params.id);
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            res.render('fornecedores/show', { fornecedor });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllFornecedores: async (req, res) => {
        try {
            const fornecedores = await Fornecedor.findAll();
            res.render('fornecedores/index', { fornecedores });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('fornecedores/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const fornecedor = await Fornecedor.findByPk(req.params.id);
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            res.render('fornecedores/edit', { fornecedor });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateFornecedor: async (req, res) => {
        try {
            const fornecedor = await Fornecedor.findByPk(req.params.id);
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            await fornecedor.update({ nome: req.body.nome });
            res.redirect('/fornecedores');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteFornecedor: async (req, res) => {
        try {
            const fornecedor = await Fornecedor.findByPk(req.params.id);
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            await fornecedor.destroy();
            res.redirect('/fornecedores');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = fornecedorController;