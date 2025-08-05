const { Op } = require('sequelize');
const Usuarios = require('../models/usuariosModel');

const usuariosController = {
  // Criação de um novo usuário
  createUsuarios: async (req, res) => {
    try {
      const newUsuarios = {
        usuariosname: req.body.usuariosname,
        password: req.body.password,
        role: req.body.role,
      };

      // Adicionar log para verificar o valor de 'role' enviado
      console.log("Role enviado:", newUsuarios.role); // Verifique o valor de 'role'

      // Validar se o valor de 'role' é válido (apenas 'admin' ou 'usuario' são permitidos)
      const validRoles = ['admin', 'usuario'];
      if (!validRoles.includes(newUsuarios.role)) {
        return res.status(400).json({ error: 'Role inválido. Use "admin" ou "usuario".' });
      }

      await Usuarios.create(newUsuarios);
      res.redirect('/usuarios');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Obter usuário pelo ID
  getUsuariosById: async (req, res) => {
    try {
      const usuariosId = req.params.id;
      const usuarios = await Usuarios.findByPk(usuariosId);

      if (!usuarios) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.render('usuarios/show', { usuarios });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Obter todos os usuários
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuarios.findAll();
      res.render('usuarios/index', { usuarios });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Renderizar o formulário de criação
  renderCreateForm: (req, res) => {
    res.render('usuarios/create');
  },

  // Renderizar o formulário de edição
  renderEditForm: async (req, res) => {
    try {
      const usuariosId = req.params.id;
      const usuarios = await Usuarios.findByPk(usuariosId);

      if (!usuarios) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.render('usuarios/edit', { usuarios });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualizar um usuário
  updateUsuarios: async (req, res) => {
    try {
      const usuariosId = req.params.id;
      const updatedUsuarios = {
        usuariosname: req.body.usuariosname,
        password: req.body.password,
        role: req.body.role,
      };

      // Adicionar log para verificar o valor de 'role' enviado
      console.log("Role enviado na atualização:", updatedUsuarios.role); // Verifique o valor de 'role'

      // Validar se o valor de 'role' é válido (apenas 'admin' ou 'usuario' são permitidos)
      const validRoles = ['admin', 'usuario'];
      if (!validRoles.includes(updatedUsuarios.role)) {
        return res.status(400).json({ error: 'Role inválido. Use "admin" ou "usuario".' });
      }

      const [updatedRows] = await Usuarios.update(updatedUsuarios, {
        where: { id: usuariosId },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.redirect('/usuarios');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deletar um usuário
  deleteUsuarios: async (req, res) => {
    try {
      const usuariosId = req.params.id;
      const deletedRows = await Usuarios.destroy({
        where: { id: usuariosId },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.redirect('/usuarios');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Buscar usuários
  searchUsuarios: async (req, res) => {
    try {
      const search = req.query.search || '';

      const usuarios = await Usuarios.findAll({
        where: {
          usuariosname: {
            [Op.like]: `%${search}%`, // Busca por nome
          },
        },
      });

      res.json({ usuarios });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = usuariosController;
