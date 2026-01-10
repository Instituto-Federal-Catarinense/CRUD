const Categoria = require('../models/categoria');

const categoriaController = {
    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('categorias/index', { categorias });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    createCategoria: async (req, res) => {
        try {
            const newCategoria = { nome: req.body.nome };
            await Categoria.create(newCategoria);
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err });
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
            res.status(500).json({ error: err });
        }
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
            res.status(500).json({ error: err });
        }
    },

    updateCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const updatedCategoria = { nome: req.body.nome };
            await Categoria.update(updatedCategoria, { where: { id: categoriaId } });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            await Categoria.destroy({ where: { id: categoriaId } });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
};

module.exports = categoriaController;


