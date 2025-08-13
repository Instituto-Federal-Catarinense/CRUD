
const Marca = require('../models/marcaModel');

const marcaController = {
    createMarca: async (req, res) => {
        try {
            await Marca.create({
                nome: req.body.nome,
                cidade: req.body.cidade,
                pais: req.body.pais,
                data_fundacao: req.body.fundacao
            });
            res.redirect('/marcas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getMarcaById: async (req, res) => {
        try {
            const marcaId = req.params.id;
            const marca = await Marca.findByPk(marcaId);
            if (!marca) {
                return res.status(404).json({ message: 'Marca not found' });
            }
            res.render('marcas/show', { marca });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllMarcas: async (req, res) => {
        try {
            const marcas = await Marca.findAll();
            res.render('marcas/index', { marcas });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('marcas/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const marcaId = req.params.id;
            const marca = await Marca.findByPk(marcaId);
            if (!marca) {
                return res.status(404).json({ message: 'Marca not found' });
            }
            res.render('marcas/edit', { marca });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateMarca: async (req, res) => {
        try {
            const marcaId = req.params.id;
            await Marca.update({
                nome: req.body.nome,
                cidade: req.body.cidade,
                pais: req.body.pais,
                data_fundacao: req.body.fundacao
            }, { where: { id: marcaId } });
            res.redirect('/marcas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteMarca: async (req, res) => {
        try {
            const marcaId = req.params.id;
            await Marca.destroy({ where: { id: marcaId } });
            res.redirect('/marcas');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = marcaController;
