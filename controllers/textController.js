const Text = require('../models/textModels');

const textController = {
    createText: (req, res) => {
        const newText = {
            name: req.body.name,
            telefone: req.body.telefone,
            email: req.body.email
        };

        Text.create(newText, (err, textId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/texts');
        });
    },

    getTextById: (req, res) => {
        const textId = req.params.id;

        Text.findById(textId, (err, text) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!text) {
                return res.status(404).json({ message: 'Text not found' });
            }
            res.render('text/show', { text });
        });
    },

    getAllTexts: (req, res) => {
        Text.getAll((err, texts) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('text/index', { texts });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('text/create');
    },

    renderEditForm: (req, res) => {
        const textId = req.params.id;

        Text.findById(textId, (err, text) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!text) {
                return res.status(404).json({ message: 'Text not found' });
            }
            res.render('text/edit', { text });
        });
    },

    updateText: (req, res) => {
        const textId = req.params.id;
        const updatedText = {
            name: req.body.name,
            telefone: req.body.telefone,
            email: req.body.email
        };

        Text.update(textId, updatedText, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/texts');
        });
    },

    deleteText: (req, res) => {
        const textId = req.params.id;

        Text.delete(textId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/texts');
        });
    },

    searchTexts: (req, res) => {
        const search = req.query.search || '';

        Text.searchByName(search, (err, texts) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ texts });
        });
    },

    // Método adicional para buscar por email
    searchByEmail: (req, res) => {
        const email = req.query.email || '';

        Text.findByEmail(email, (err, text) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ text });
        });
    }
};

module.exports = textController;