const Categoria = require('../models/categoriaModel');

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const { nome } = req.body;
            await Categoria.create({ nome });
            res.redirect('/categorias');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCategoriaById: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.render('categorias/show', { categoria });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('categorias/index', { categorias });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.render('categorias/edit', { categoria });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const { nome } = req.body;

            const categoria = await Categoria.findByPk(categoriaId);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            await categoria.update({ nome });
            res.redirect('/categorias');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            await categoria.destroy();
            res.redirect('/categorias');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = categoriaController;
