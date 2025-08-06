const { Usuario, Sequelize } = require('../models'); // Corrigi a forma como você importa os models

const usuarioController = {
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
            res.status(500).json({ error: err.message }); // Melhor tratamento de erro
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
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
            const usuario = await Usuario.findByPk(req.params.id);
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
            const updatedUsuario = {
                usuarioname: req.body.usuarioname,
                password: req.body.password,
                role: req.body.role,
            };
            await Usuario.update(updatedUsuario, { where: { id: usuarioId } });
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
                        [Sequelize.Op.like]: `%${search}%`
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
