const Usuarios = require('../models/usuariosModel');
const { Op } = require('sequelize');

const usuariosController = {
    createUsuarios: async (req, res) => {
        try {
            await Usuarios.create({
                usuariosname: req.body.usuariosname,
                password: req.body.password,
                role: req.body.role
            });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getUsuariosById: async (req, res) => {
        try {
            const usuarios = await Usuarios.findByPk(req.params.id);
            if (!usuarios) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/show', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getAllUsuarioss: async (req, res) => {
        try {
            const usuarios = await Usuarios.findAll();
            res.render('usuarios/index', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const usuarios = await Usuarios.findByPk(req.params.id);
            if (!usuarios) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/edit', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateUsuarios: async (req, res) => {
        try {
            await Usuarios.update({
                usuariosname: req.body.usuariosname,
                password: req.body.password,
                role: req.body.role
            }, {
                where: { id: req.params.id }
            });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteUsuarios: async (req, res) => {
        try {
            await Usuarios.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    searchUsuarioss: async (req, res) => {
        try {
            const search = req.query.search || '';
            const usuarios = await Usuarios.findAll({
                where: {
                    usuariosname: {
                        [Op.like]: `%${search}%`
                    }
                }
            });
            res.json({ usuarios });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};

module.exports = usuariosController;
