const { Marca } = require('../models');

const marcaController = {
    createMarca: async (req, res) => {
        try {
            await Marca.create({ nome: req.body.nome });
            res.redirect('/marca');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getMarcaById: async (req, res) => {
        try {
            const marca = await Marca.findByPk(req.params.id);
            if (!marca) {
                return res.status(404).json({ message: 'Marca not found' });
            }
            res.render('marca/show', { marca });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllMarca: async (req, res) => {
        try {
            const marca = await Marca.findAll();
            res.render('marca/index', { marca });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('marca/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const marca = await Marca.findByPk(req.params.id);
            if (!marca) {
                return res.status(404).json({ message: 'Marca not found' });
            }
            res.render('marca/edit', { marca });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateMarca: async (req, res) => {
        try {
            await Marca.update(
                { nome: req.body.nome },
                { where: { id: req.params.id } }
            );
            res.redirect('/marca');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteMarca: async (req, res) => {
        try {
            await Marca.destroy({ where: { id: req.params.id } });
            res.redirect('/marca');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = marcaController;
