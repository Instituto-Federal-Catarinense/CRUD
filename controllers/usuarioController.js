const usuario = require('../models/usuarioModel');

const usuarioController = {
    createusuario: (req, res) => {
        const newusuario = {
            usuarioname: req.body.usuarioname,
            password: req.body.password,
            role: req.body.role,
        };

        usuario.create(newusuario, (err, usuarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    getusuarioById: (req, res) => {
        const usuarioId = req.params.id;

        usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'usuario not found' });
            }
            res.render('usuarios/show', { usuario });
        });
    },

    getAllusuarios: (req, res) => {
        usuario.getAll((err, usuarios) => {
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

        usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'usuario not found' });
            }
            res.render('usuarios/edit', { usuario });
        });
    },

    updateusuario: (req, res) => {
        const usuarioId = req.params.id;
        const updatedusuario = {
            usuarioname: req.body.usuarioname,
            password: req.body.password,
            role: req.body.role,
        };

        usuario.update(usuarioId, updatedusuario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    deleteusuario: (req, res) => {
        const usuarioId = req.params.id;

        usuario.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },
};

module.exports = usuarioController;
