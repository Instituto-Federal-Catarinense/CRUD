const Fornecedor = require('../models/fornecedor');
const Categoria = require('../models/categoria');

const fornecedorController = {
    getAllFornecedores: async (req, res) => {
        try {
            const fornecedores = await Fornecedor.findAll({
                include: [{ model: Categoria, attributes: ['nome'] }]
            });
            res.render('fornecedores/index', { fornecedores });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('fornecedores/create', { categorias });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    createFornecedor: async (req, res) => {
        try {
            const newFornecedor = {
                nome: req.body.nome,
                categoria: req.body.categoria,
            };
            await Fornecedor.create(newFornecedor);
            res.redirect('/fornecedores');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getFornecedorById: async (req, res) => {
        try {
            const fornecedorId = req.params.id;
            const fornecedor = await Fornecedor.findByPk(fornecedorId, {
                include: [{ model: Categoria, attributes: ['nome'] }]
            });
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            res.render('fornecedores/show', { fornecedor });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const fornecedorId = req.params.id;
            const fornecedor = await Fornecedor.findByPk(fornecedorId);
            if (!fornecedor) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }
            const categorias = await Categoria.findAll();
            res.render('fornecedores/edit', { fornecedor, categorias });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateFornecedor: async (req, res) => {
        try {
            const fornecedorId = req.params.id;
            const updatedFornecedor = {
                nome: req.body.nome,
                categoria: req.body.categoria,
            };
            await Fornecedor.update(updatedFornecedor, { where: { id: fornecedorId } });
            res.redirect('/fornecedores');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteFornecedor: async (req, res) => {
        try {
            const fornecedorId = req.params.id;
            await Fornecedor.destroy({ where: { id: fornecedorId } });
            res.redirect('/fornecedores');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
};

module.exports = fornecedorController;

