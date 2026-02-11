const Tanque = require('../models/tanqueModel');
const Categoria = require('../models/categoriaModel');

const tanqueController = {
    renderCreateForm: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('tanques/create', { categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createTanque: async (req, res) => {
        try {
            await Tanque.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria
            });
            res.redirect('/tanques');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllTanques: async (req, res) => {
        const categoria = req.query.categoria || null;
        try {
            const where = categoria ? { categoria } : {};
            const tanques = await Tanque.findAll({ where });
            const categorias = await Categoria.findAll();
            res.render('tanques/index', { tanques, categorias, categoriaSelecionada: categoria });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getTanqueById: async (req, res) => {
        try {
            const tanque = await Tanque.findByPk(req.params.id);
            if (!tanque) return res.status(404).json({ message: 'Tanque não encontrado' });
            res.render('tanques/show', { tanque });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const tanque = await Tanque.findByPk(req.params.id);
            if (!tanque) return res.status(404).json({ message: 'Tanque não encontrado' });
            const categorias = await Categoria.findAll();
            res.render('tanques/edit', { tanque, categorias });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateTanque: async (req, res) => {
        try {
            const tanque = await Tanque.findByPk(req.params.id);
            if (!tanque) return res.status(404).json({ message: 'Tanque não encontrado' });
            await tanque.update({
                nome: req.body.nome,
                descricao: req.body.descricao,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                categoria: req.body.categoria
            });
            res.redirect('/tanques');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteTanque: async (req, res) => {
        try {
            const tanque = await Tanque.findByPk(req.params.id);
            if (!tanque) return res.status(404).json({ message: 'Tanque não encontrado' });
            await tanque.destroy();
            res.redirect('/tanques');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = tanqueController;
