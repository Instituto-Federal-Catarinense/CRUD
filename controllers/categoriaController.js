const Categoria = require('../models/categoriaModel');

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const { nome } = req.body;
            const categoria = await Categoria.create({ nome });
            res.redirect('/categorias'); // Redireciona para a lista de categorias
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao criar categoria' });
        }
    },

    getCategoriaById: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.render('categorias/show', { categoria });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar categoria' });
        }
    },

    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('categorias/index', { categorias });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar categorias' });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.render('categorias/edit', { categoria });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar categoria' });
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
            categoria.nome = nome;
            await categoria.save();
            res.redirect('/categorias');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar categoria' });
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
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar categoria' });
        }
    }
};

module.exports = categoriaController;
