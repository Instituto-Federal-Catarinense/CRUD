const Usuarios = require('../models/usuariosModel');

const usuariosController = {
    createUsuarios: (req, res) => {
        const newUsuarios = {
            usuariosname: req.body.usuariosname,
            password: req.body.password,
            role: req.body.role,
        };

        Usuarios.create(newUsuarios, (err, usuariosId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    getUsuariosById: (req, res) => {
        const usuariosId = req.params.id;

        Usuarios.findById(usuariosId, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuarios) {
                return res.status(404).json({ message: 'Usuarios not found' });
            }
            res.render('usuarios/show', { usuarios });
        });
    },

    getAllUsuarioss: (req, res) => {
        Usuarios.getAll((err, usuarios) => {
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
        const usuariosId = req.params.id;

        Usuarios.findById(usuariosId, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuarios) {
                return res.status(404).json({ message: 'Usuarios not found' });
            }
            res.render('usuarios/edit', { usuarios });
        });
    },

    updateUsuarios: (req, res) => {
        const usuariosId = req.params.id;
        const updatedUsuarios = {
            usuariosname: req.body.usuariosname,
            password: req.body.password,
            role: req.body.role,
        };

        Usuarios.update(usuariosId, updatedUsuarios, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    deleteUsuarios: (req, res) => {
        const usuariosId = req.params.id;

        Usuarios.delete(usuariosId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    searchUsuarioss: (req, res) => {
        const search = req.query.search || '';

        Usuarios.searchByName(search, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ usuarios });
        });
    },
};

module.exports = usuariosController;
