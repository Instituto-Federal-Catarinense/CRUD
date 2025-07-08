const User = require('../models/usuarioModel');

const usuarioController = {
    createUser: (req, res) => {
        const newUser = {
            usuarioname: req.body.usuarioname,
            password: req.body.password,
            role: req.body.role,
        };

        User.create(newUser, (err, usuarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    getUserById: (req, res) => {
        const usuarioId = req.params.id;

        User.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('usuarios/show', { usuario });
        });
    },

    getAllUsers: (req, res) => {
        User.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('usuarios/index', { usuarios });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    renderEditForm: (req, res) => {
        const usuarioId = req.params.id;

        User.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('usuarios/edit', { usuario });
        });
    },

    updateUser: (req, res) => {
        const usuarioId = req.params.id;
        const updatedUser = {
            usuarioname: req.body.usuarioname,
            password: req.body.password,
            role: req.body.role,
        };

        User.update(usuarioId, updatedUser, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    deleteUser: (req, res) => {
        const usuarioId = req.params.id;

        User.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    searchUsers: (req, res) => {
        const search = req.query.search || '';

        User.searchByName(search, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ usuarios });
        });
    },
};

module.exports = usuarioController;
