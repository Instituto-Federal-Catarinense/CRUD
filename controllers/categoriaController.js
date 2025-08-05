const { Categoria } = require('../models'); // Ajuste conforme seu index.js dos models

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const { nome } = req.body;
            await Categoria.create({ nome });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCategoriaById: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            res.render('categorias/show', { categoria });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('categorias/index', { categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            res.render('categorias/edit', { categoria });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateCategoria: async (req, res) => {
        try {
            const { nome } = req.body;
            const [updated] = await Categoria.update(
                { nome },
                { where: { id: req.params.id } }
            );
            if (!updated) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            const deleted = await Categoria.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = categoriaController;
