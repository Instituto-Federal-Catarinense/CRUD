const Teste = require('../models/testeModel');

const testeController = {
    createTeste: async (req, res) => {
        try {
            await Teste.create({
                nome: req.body.nome,
                descricao: req.body.descricao
            });
            res.redirect('/teste');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getTesteById: async (req, res) => {
        try {
            const teste = await Teste.findByPk(req.params.id);
            if (!teste) {
                return res.status(404).json({ message: 'Teste não encontrado' });
            }
            res.render('teste/show', { teste });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getAllTeste: async (req, res) => {
        try {
            const teste = await Teste.findAll();
            res.render('teste/index', { teste });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('teste/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const teste = await Teste.findByPk(req.params.id);
            if (!teste) {
                return res.status(404).json({ message: 'Teste não encontrado' });
            }
            res.render('teste/edit', { teste });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateTeste: async (req, res) => {
        try {
            await Teste.update(
                {
                    nome: req.body.nome,
                    descricao: req.body.descricao
                },
                { where: { id: req.params.id } }
            );
            res.redirect('/teste');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteTeste: async (req, res) => {
        try {
            await Teste.destroy({ where: { id: req.params.id } });
            res.redirect('/teste');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    searchTeste: async (req, res) => {
        try {
            const search = req.query.search || '';
            const teste = await Teste.findAll({
                where: {
                    nome: {
                        [require('sequelize').Op.like]: `%${search}%`
                    }
                }
            });
            res.json({ teste });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};

module.exports = testeController;
