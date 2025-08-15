const Time = require('../models/timeModel');

const timeController = {
    // Criar novo time
    createTime: (req, res) => {
        const newTime = {
            nome: req.body.nome,
            cidade: req.body.cidade,
            pais: req.body.pais,
            data_fundacao: req.body.fundacao // deve bater com name="fundacao" no form
        };

        Time.create(newTime, (err, timeId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/times');
        });
    },

    // Buscar time por ID
    getTimeById: (req, res) => {
        const timeId = req.params.id;

        Time.findById(timeId, (err, time) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!time) {
                return res.status(404).json({ message: 'Time not found' });
            }
            res.render('times/show', { time });
        });
    },

    // Listar todos os times
    getAllTimes: (req, res) => {
        Time.getAll((err, times) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('times/index', { times });
        });
    },

    // Renderizar formulário de criação
    renderCreateForm: (req, res) => {
        res.render('times/create');
    },

    // Renderizar formulário de edição
    renderEditForm: (req, res) => {
        const timeId = req.params.id;

        Time.findById(timeId, (err, time) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!time) {
                return res.status(404).json({ message: 'Time not found' });
            }
            res.render('times/edit', { time });
        });
    },

    // Atualizar um time
    updateTime: (req, res) => {
        const timeId = req.params.id;
        const updatedTime = {
            nome: req.body.nome,
            cidade: req.body.cidade,
            pais: req.body.pais,
            data_fundacao: req.body.fundacao
        };

        Time.update(timeId, updatedTime, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/times');
        });
    },

    // Excluir um time
    deleteTime: (req, res) => {
        const timeId = req.params.id;

        Time.delete(timeId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/times');
        });
    }
};

module.exports = timeController;
