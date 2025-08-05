const { Text } = require('../models'); // Ajuste conforme seu index.js dos models
const { Op } = require('sequelize');

const textController = {
    createText: async (req, res) => {
        try {
            const { name, telefone, email } = req.body;
            await Text.create({ name, telefone, email });
            res.redirect('/texts');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getTextById: async (req, res) => {
        try {
            const text = await Text.findByPk(req.params.id);
            if (!text) {
                return res.status(404).json({ message: 'Text not found' });
            }
            res.render('text/show', { text });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllTexts: async (req, res) => {
        try {
            const texts = await Text.findAll();
            res.render('text/index', { texts });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('text/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const text = await Text.findByPk(req.params.id);
            if (!text) {
                return res.status(404).json({ message: 'Text not found' });
            }
            res.render('text/edit', { text });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateText: async (req, res) => {
        try {
            const { name, telefone, email } = req.body;
            const [updated] = await Text.update(
                { name, telefone, email },
                { where: { id: req.params.id } }
            );
            if (!updated) {
                return res.status(404).json({ message: 'Text not found' });
            }
            res.redirect('/texts');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteText: async (req, res) => {
        try {
            const deleted = await Text.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ message: 'Text not found' });
            }
            res.redirect('/texts');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchTexts: async (req, res) => {
        try {
            const search = req.query.search || '';
            const texts = await Text.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                }
            });
            res.json({ texts });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchByEmail: async (req, res) => {
        try {
            const email = req.query.email || '';
            const text = await Text.findOne({ where: { email } });
            res.json({ text });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = textController;