const { Categoria } = require('../models'); // Ajuste para importar o model via Sequelize

const categoriaController = {
    // Criar uma nova categoria
    createCategoria: async (req, res) => {
        try {
            await Categoria.create({ nome: req.body.nome });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter uma categoria pelo ID
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

    // Obter todas as categorias
    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('categorias/index', { categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    // Renderizar o formulário de edição
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

    // Atualizar os dados de uma categoria
    updateCategoria: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            await categoria.update({ nome: req.body.nome });
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Deletar uma categoria
    deleteCategoria: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }
            await categoria.destroy();
            res.redirect('/categorias');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = categoriaController;