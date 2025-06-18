const Teste = require('../models/testeModel');

const testeController = {
    createTeste: (req, res) => {
        const newTeste = {
            teste: req.body.teste
        };

        Teste.create(newTeste, (err, testeId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/teste');
        });
    },

    getTesteById: (req, res) => {
        const testeId = req.params.id;

        Teste.findById(testeId, (err, teste) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!teste) {
                return res.status(404).json({ message: 'Teste not found' });
            }
            res.render('teste/show', { teste });
        });
    },

    getAllTestes: (req, res) => {
        Teste.getAll((err, testes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('teste/index', { testes });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('teste/create');
    },

    renderEditForm: (req, res) => {
        const testeId = req.params.id;

        Teste.findById(testeId, (err, teste) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!teste) {
                return res.status(404).json({ message: 'Teste not found' });
            }
            res.render('teste/edit', { teste });
        });
    },

    updateTeste: (req, res) => {
        const testeId = req.params.id;
        const updatedTeste = {
            nome: req.body.nome
        };

        Teste.update(testeId, updatedTeste, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/teste');
        });
    },

    deleteTeste: (req, res) => {
        const testeId = req.params.id;

        Teste.delete(testeId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/teste');
        });
    }
};

module.exports = testeController;
