const horario = require('../models/Model');

const timeController = {
    Criar_Horario: (req, res) => {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };

        horario.create(newUser, (err, userId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/horario');
        });
    },

    getUserById: (req, res) => {
        const horarioId = req.params.id;

        horario.findById(horarioId, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('horario/show', { user });
        });
    },

    getAllHorario: (req, res) => {
        User.getAll((err, users) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('horario/index', { horario });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('horario/create');
    },

    renderEditForm: (req, res) => {
        const horarioId = req.params.id;

        User.findById(horarioId, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('users/edit', { user });
        });
    },

    updateHorario: (req, res) => {
        const horarioId = req.params.id;
        const updatedHorario = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };

        User.update(horarioId, updatedHorario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/users');
        });
    },

    deleteHorario: (req, res) => {
        const horarioId = req.params.id;

        horario.delete(horarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/users');
        });
    },
};

module.exports = timeController;
