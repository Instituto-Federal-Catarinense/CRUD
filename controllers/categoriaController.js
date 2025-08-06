const { Categoria } = require('../models');

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const newCategoria = {
                nome: req.body.nome,
            };
            const categoria = await Categoria.create(newCategoria);
            res.redirect('/categorias');
        } catch (err) {
            console.error('Erro ao criar categoria:', err);
            res.status(500).json({ error: err.message });
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
            console.error('Erro ao buscar categoria:', err);
            res.status(500).json({ error: err.message });
        }
    },

    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('categorias/index', { categorias });
        } catch (err) {
            console.error('Erro ao buscar categorias:', err);
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
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.render('categorias/edit', { categoria });
        } catch (err) {
            console.error('Erro ao buscar categoria para editar:', err);
            res.status(500).json({ error: err.message });
        }
    },

    updateCategoria: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            await categoria.update({ nome: req.body.nome });
            res.redirect('/categorias');
        } catch (err) {
            console.error('Erro ao atualizar categoria:', err);
            res.status(500).json({ error: err.message });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            await categoria.destroy();
            res.redirect('/categorias');
        } catch (err) {
            console.error('Erro ao excluir categoria:', err);
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = categoriaController;