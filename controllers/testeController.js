const Teste = require('../models/testeModel');

const testeController = {

    createTeste: async (req, res) => {
        try {
            await Teste.create({
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                ativo: req.body.ativo === 'on' ? true : false
            });
            res.redirect('/testes');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getTesteById: async (req, res) => {
        try {
            const teste = await Teste.findByPk(req.params.id);
            if (!teste) {
                return res.status(404).json({ message: 'Teste not found' });
            }
            res.render('testes/edit', { teste });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getAllTestes: async (req, res) => {
        try {
            const testes = await Teste.findAll();
            res.render('testes/index', { testes });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('testes/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const teste = await Teste.findByPk(req.params.id);
            if (!teste) {
                return res.status(404).json({ message: 'Teste not found' });
            }
            res.render('testes/edit', { teste });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateTeste: async (req, res) => {
        try {
            await Teste.update(
                {
                    titulo: req.body.titulo,
                    descricao: req.body.descricao,
                    ativo: req.body.ativo === 'on'
                },
                { where: { id: req.params.id } }
            );
            res.redirect('/testes');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteTeste: async (req, res) => {
        try {
            await Teste.destroy({ where: { id: req.params.id } });
            res.redirect('/testes');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};

module.exports = testeController;
