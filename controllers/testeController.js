const Teste = require('../models/testeModel'); // Corrigido

const testeController = {
    createTeste: (req, res) => {
        const newTeste = {
            nome: req.body.nome,
            descricao: req.body.descricao,
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
                return res.status(404).json({ message: 'Teste não encontrado' });
            }
            res.render('teste/show', { teste });
        });
    },

    getAllTeste: (req, res) => {
        Teste.getAll((err, teste) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('teste/index', { teste });
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
                return res.status(404).json({ message: 'Teste não encontrado' });
            }
            res.render('teste/edit', { teste });
        });
    },

    updateTeste: (req, res) => {
        const testeId = req.params.id;
        const updatedTeste = {
            nome: req.body.nome,
            descricao: req.body.descricao,
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
    },

    searchTeste: (req, res) => {
        const search = req.query.search || '';

        Teste.searchByName(search, (err, teste) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ teste });
        });
    },
};

module.exports = testeController;
