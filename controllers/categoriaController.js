const { Categoria } = require('../models/categoriaModel');

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const newCategoria = { nome: req.body.nome };
            const categoria = await Categoria.create(newCategoria);
            res.redirect('/categorias');
        } catch (err) {
            return res.status(500).json({ error: err });
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
            return res.status(500).json({ error: err });
        }
    },

    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('categorias/index', { categorias });
        } catch (err) {
            return res.status(500).json({ error: err });
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
            return res.status(500).json({ error: err });
        }
    },

    updateCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            await Categoria.update({ nome: req.body.nome }, { where: { id: categoriaId } });
            res.redirect('/categorias');
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            await Categoria.destroy({ where: { id: req.params.id } });
            res.redirect('/categorias');
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }
};

module.exports = categoriaController;
