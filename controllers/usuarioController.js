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
            res.status(500).json({ error: err });
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) return res.status(404).json({ message: 'Usuario not found' });
            res.render('usuarios/show', { usuario });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
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
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) return res.status(404).json({ message: 'Usuario not found' });
            res.render('usuarios/edit', { usuario });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            await Usuario.update(
                {
                    usuarioname: req.body.usuarioname,
                    password: req.body.password,
                    role: req.body.role,
                },
                { where: { id: req.params.id } }
            );
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            await Usuario.destroy({ where: { id: req.params.id } });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err });
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
            res.status(500).json({ error: err });
        }
    },
};

module.exports = usuarioController;
