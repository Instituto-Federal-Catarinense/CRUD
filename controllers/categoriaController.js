const Categoria = require('../models/categoriaModel');

const categoriaController = {
    createCategoria: (req, res) => {
        const newCategoria = {
            nome: req.body.nome
        };

        Categoria.create(newCategoria, (err, categoriaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/categorias');
        });
    },

    getCategoriaById: (req, res) => {
        const categoriaId = req.params.id;

        Categoria.findById(categoriaId, (err, categoria) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            res.render('categorias/show', { categoria });
        });
    },

    getAllCategorias: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('categorias/index', { categorias });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    renderEditForm: (req, res) => {
        const categoriaId = req.params.id;

        Categoria.findById(categoriaId, (err, categoria) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            res.render('categorias/edit', { categoria });
        });
    },

    updateCategoria: (req, res) => {
        const categoriaId = req.params.id;
        const updatedCategoria = {
            nome: req.body.nome
        };

        Categoria.update(categoriaId, updatedCategoria, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/categorias');
        });
    },

    deleteCategoria: (req, res) => {
        const categoriaId = req.params.id;

        Categoria.delete(categoriaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/categorias');
        });
    }
};

module.exports = categoriaController;
