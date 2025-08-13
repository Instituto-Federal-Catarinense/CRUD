const Usuario = require('../models/usuarioModel');
const { Op } = require('sequelize');

const usuarioController = {
    createUsuario: async (req, res) => {
        try {
            const { usuarioname, password, role } = req.body;

            await Usuario.create({ usuarioname, password, role });
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
                return res.status(404).json({ message: 'Usuário não encontrado' });
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
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.render('usuarios/edit', { usuario });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const { usuarioname, password, role } = req.body;

            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await usuario.update({ usuarioname, password, role });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const usuarioId = req.params.id;

            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await usuario.destroy();
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
                        [Op.like]: `%${search}%`
                    }
                }
            });

            res.json({ usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = usuarioController;
