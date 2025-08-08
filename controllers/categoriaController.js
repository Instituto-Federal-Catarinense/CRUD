
const Categoria = require('../models/categoriaModel');

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const newCategoria = await Categoria.create({ nome: req.body.nome });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCategoriaById: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);
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
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);
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
            const categoriaId = req.params.id;
            await Categoria.update(
                { nome: req.body.nome },
                { where: { id: categoriaId } }
            );
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            await Categoria.destroy({ where: { id: categoriaId } });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = categoriaController;
