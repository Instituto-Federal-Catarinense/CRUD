const Capivara = require('../models/Capivara');
const { Op } = require('sequelize');

const capivaraController = {
    createcapivara: async (req, res) => {
        try {
            const newCapivara = {
                nome: req.body.nome,
                descricao: req.body.descricao,
            };

            await Capivara.create(newCapivara);
            res.redirect('/capivara');
        } catch (error) {
            console.error('Error creating capivara:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getcapivaraById: async (req, res) => {
        try {
            const capivaraId = req.params.id;
            const capivaraEncontrada = await Capivara.findByPk(capivaraId);

            if (!capivaraEncontrada) {
                return res.status(404).json({ message: 'Capivara não encontrada' });
            }

            res.render('capivara/show', { capivara: capivaraEncontrada });
        } catch (error) {
            console.error('Error fetching capivara:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllcapivara: async (req, res) => {
        try {
            const capivaras = await Capivara.findAll({
                order: [['id', 'ASC']]
            });
            res.render('capivara/index', { capivara: capivaras });
        } catch (error) {
            console.error('Error fetching capivaras:', error);
            res.status(500).json({ error: error.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('capivara/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const capivaraId = req.params.id;
            const capivaraEncontrada = await Capivara.findByPk(capivaraId);

            if (!capivaraEncontrada) {
                return res.status(404).json({ message: 'Capivara não encontrada' });
            }

            res.render('capivara/edit', { capivara: capivaraEncontrada });
        } catch (error) {
            console.error('Error fetching capivara for edit:', error);
            res.status(500).json({ error: error.message });
        }
    },

    updatecapivara: async (req, res) => {
        try {
            const capivaraId = req.params.id;
            const updatedCapivara = {
                nome: req.body.nome,
                descricao: req.body.descricao,
            };

            const [updated] = await Capivara.update(updatedCapivara, {
                where: { id: capivaraId }
            });

            if (updated) {
                res.redirect('/capivara');
            } else {
                res.status(404).json({ message: 'Capivara não encontrada' });
            }
        } catch (error) {
            console.error('Error updating capivara:', error);
            res.status(500).json({ error: error.message });
        }
    },

    deletecapivara: async (req, res) => {
        try {
            const capivaraId = req.params.id;
            const deleted = await Capivara.destroy({
                where: { id: capivaraId }
            });

            if (deleted) {
                res.redirect('/capivara');
            } else {
                res.status(404).json({ message: 'Capivara não encontrada' });
            }
        } catch (error) {
            console.error('Error deleting capivara:', error);
            res.status(500).json({ error: error.message });
        }
    },

    searchcapivara: async (req, res) => {
        try {
            const search = req.query.search || '';

            const resultados = await Capivara.findAll({
                where: {
                    nome: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [['id', 'ASC']]
            });

            res.json({ capivara: resultados });
        } catch (error) {
            console.error('Error searching capivaras:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = capivaraController;