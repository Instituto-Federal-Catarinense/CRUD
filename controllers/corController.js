const { Cor } = require('../models'); // Importa o model já configurado com Sequelize

const corController = {
    // Criar uma nova cor
    createCor: async (req, res) => {
        try {
            await Cor.create({ nome: req.body.nome });
            res.redirect('/cores');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter uma cor pelo ID
    getCorById: async (req, res) => {
        try {
            const cor = await Cor.findByPk(req.params.id);
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            res.render('cores/show', { cor });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter todas as cores
    getAllCores: async (req, res) => {
        try {
            const cores = await Cor.findAll();
            res.render('cores/index', { cores });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('cores/create');
    },

    // Renderizar o formulário de edição
    renderEditForm: async (req, res) => {
        try {
            const cor = await Cor.findByPk(req.params.id);
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            res.render('cores/edit', { cor });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Atualizar os dados de uma cor
    updateCor: async (req, res) => {
        try {
            const cor = await Cor.findByPk(req.params.id);
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            await cor.update({ nome: req.body.nome });
            res.redirect('/cores');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Deletar uma cor
    deleteCor: async (req, res) => {
        try {
            const cor = await Cor.findByPk(req.params.id);
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