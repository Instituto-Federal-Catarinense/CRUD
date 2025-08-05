
const Time = require('../models/timeModel');

const timeController = {
    createTime: async (req, res) => {
        try {
            await Time.create({
                nome: req.body.nome,
                cidade: req.body.cidade,
                pais: req.body.pais,
                data_fundacao: req.body.fundacao
            });
            res.redirect('/times');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getTimeById: async (req, res) => {
        try {
            const timeId = req.params.id;
            const time = await Time.findByPk(timeId);
            if (!time) {
                return res.status(404).json({ message: 'Time not found' });
            }
            res.render('times/show', { time });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllTimes: async (req, res) => {
        try {
            const times = await Time.findAll();
            res.render('times/index', { times });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('times/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const timeId = req.params.id;
            const time = await Time.findByPk(timeId);
            if (!time) {
                return res.status(404).json({ message: 'Time not found' });
            }
            res.render('times/edit', { time });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateTime: async (req, res) => {
        try {
            const timeId = req.params.id;
            await Time.update({
                nome: req.body.nome,
                cidade: req.body.cidade,
                pais: req.body.pais,
                data_fundacao: req.body.fundacao
            }, { where: { id: timeId } });
            res.redirect('/times');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteTime: async (req, res) => {
        try {
            const timeId = req.params.id;
            await Time.destroy({ where: { id: timeId } });
            res.redirect('/times');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = timeController;
