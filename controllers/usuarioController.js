const Usuario = require('../models/usuario');

const usuarioController = {
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.render('usuarios/index', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    searchUsuarios: async (req, res) => {
        try {
            const { Op } = require('sequelize');
            const search = req.query.search || '';
            const usuarios = await Usuario.findAll({
                where: {
                    usuarioname: { [Op.like]: `%${search}%` }
                }
            });
            res.json({ usuarios });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    createUsuario: async (req, res) => {
        try {
            const newUsuario = {
                usuarioname: req.body.usuarioname,
                password: req.body.password,
                role: req.body.role,
            };
            await Usuario.create(newUsuario);
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario not found' });
            }
            res.render('usuarios/show', { usuario });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario not found' });
            }
            res.render('usuarios/edit', { usuario });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const updatedUsuario = {
                usuarioname: req.body.usuarioname,
                password: req.body.password,
                role: req.body.role,
            };
            await Usuario.update(updatedUsuario, { where: { id: usuarioId } });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            await Usuario.destroy({ where: { id: usuarioId } });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
};

module.exports = usuarioController;