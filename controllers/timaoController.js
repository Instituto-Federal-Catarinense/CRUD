const Timao = require('../models/timaoModel');

const timaoController = {
    createTimao: (req, res) => {
        const newTimao = {
            nome: req.body.nome
        };

        Timao.create(newTimao, (err, timaoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/timao');
        });
    },

    getTimaoById: (req, res) => {
        const timaoId = req.params.id;

        Timao.findById(timaoId, (err, timao) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!timao) {
                return res.status(404).json({ message: 'Timao not found' });
            }
            res.render('timaos/show', { timao });
        });
    },

    getAllTimaos: (req, res) => {
        Timao.getAll((err, timaos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('timaos/index', { timaos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('timaos/create');
    },

    renderEditForm: (req, res) => {
        const timaoId = req.params.id;

        Timao.findById(timaoId, (err, timao) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!timao) {
                return res.status(404).json({ message: 'Timao not found' });
            }
            res.render('timaos/edit', { timao });
        });
    },

    updateTimao: (req, res) => {
        const timaoId = req.params.id;
        const updatedTimao = {
            nome: req.body.nome
        };

        Timao.update(timaoId, updatedTimao, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/timaos');
        });
    },

    deleteTimao: (req, res) => {
        const timaoId = req.params.id;

        Timao.delete(timaoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/timao');
        });
    }
};

module.exports = timaoController;
