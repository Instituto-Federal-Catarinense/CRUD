const { Cor } = require('../models');

const corController = {
    createCor: async (req, res) => {
        try {
            const newCor = { nome: req.body.nome };
            await Cor.create(newCor);
            res.redirect('/cores');
        } catch (err) {
            console.error('Erro ao criar cor:', err);
            res.status(500).json({ error: err.message });
        }
    },

    getCorById: async (req, res) => {
        try {
            const cor = await Cor.findByPk(req.params.id);
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            res.render('cores/show', { cor });
        } catch (err) {
            console.error('Erro ao buscar cor:', err);
            res.status(500).json({ error: err.message });
        }
    },

    getAllCores: async (req, res) => {
        try {
            const cores = await Cor.findAll();
            res.render('cores/index', { cores });
        } catch (err) {
            console.error('Erro ao buscar cores:', err);
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('cores/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const cor = await Cor.findByPk(req.params.id);
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            res.render('cores/edit', { cor });
        } catch (err) {
            console.error('Erro ao buscar cor para editar:', err);
            res.status(500).json({ error: err.message });
        }
    },

    updateCor: async (req, res) => {
        try {
            const cor = await Cor.findByPk(req.params.id);
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            await cor.update({ nome: req.body.nome });
            res.redirect('/cores');
        } catch (err) {
            console.error('Erro ao atualizar cor:', err);
            res.status(500).json({ error: err.message });
        }
    },

    deleteCor: async (req, res) => {
        try {
            const cor = await Cor.findByPk(req.params.id);
            if (!cor) {
                return res.status(404).json({ message: 'Cor não encontrada' });
            }
            await cor.destroy();
            res.redirect('/cores');
        } catch (err) {
            console.error('Erro ao excluir cor:', err);
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = corController;
