
const Usuario = require('../models/usuarioModel');

const usuarioController = {
    createUsuario: async (req, res) => {
        try {
            await Usuario.create({
                usuarioname: req.body.usuarioname,
                password: req.body.password,
                role: req.body.role,
            });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
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
            res.status(500).json({ error: err.message });
        }
    },

    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.render('usuarios/index', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
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
            res.status(500).json({ error: err.message });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            await Usuario.update({
                usuarioname: req.body.usuarioname,
                password: req.body.password,
                role: req.body.role,
            }, { where: { id: usuarioId } });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            await Usuario.destroy({ where: { id: usuarioId } });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchUsuarios: async (req, res) => {
        try {
            const search = req.query.search || '';
            const usuarios = await Usuario.findAll({
                where: {
                    usuarioname: {
                        [require('sequelize').Op.like]: `%${search}%`
                    }
                }
            });
            res.json({ usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = usuarioController;
