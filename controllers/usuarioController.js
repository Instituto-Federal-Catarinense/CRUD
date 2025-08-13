const { Usuario } = require('../models');

const usuarioController = {
    // Criar um novo usuário
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

    // Obter usuário por ID
    getUsuarioById: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario not found' });
            }
            res.render('usuarios/show', { usuario });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter todos os usuários
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.render('usuarios/index', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Renderizar formulário de criação
    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    // Renderizar formulário de edição
    renderEditForm: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario not found' });
            }
            res.render('usuarios/edit', { usuario });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Atualizar usuário
    updateUsuario: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario not found' });
            }
            await usuario.update({
                usuarioname: req.body.usuarioname,
                password: req.body.password,
                role: req.body.role,
            });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Deletar usuário
    deleteUsuario: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario not found' });
            }
            await usuario.destroy();
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Buscar usuários por nome
    searchUsuarios: async (req, res) => {
        try {
            const search = req.query.search || '';
            const usuarios = await Usuario.findAll({
                where: {
                    usuarioname: {
                        // Sequelize operador LIKE (ajuste se necessário)
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