const Cor = require('../models/corModel');

const corController = {

    createCor: async (req, res) => {
        try {
            const { nome, codigo } = req.body;
            await Cor.create({ nome, codigo });
            res.redirect('/cores');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCorById: async (req, res) => {
        try {
            const corId = req.params.id;
            const cor = await Cor.findByPk(corId);

            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }

            res.render('cores/show', { cor });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllCores: async (req, res) => {
        try {
            const cores = await Cor.findAll();
            res.render('cores/index', { cores });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('cores/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const corId = req.params.id;
            const cor = await Cor.findByPk(corId);

            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }

            res.render('cores/edit', { cor });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateCor: async (req, res) => {
        try {
            const corId = req.params.id;
            const { nome, codigo } = req.body;

            const cor = await Cor.findByPk(corId);
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }

            await cor.update({ nome, codigo });
            res.redirect('/cores');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteCor: async (req, res) => {
        try {
            const corId = req.params.id;
            const cor = await Cor.findByPk(corId);

            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }

            await cor.destroy();
            res.redirect('/cores');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = corController;
