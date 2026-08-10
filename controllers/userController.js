const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userController = {
    createUser: (req, res) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        
        // Aceita o perfil enviado no formulário (admin ou user), garantindo 'user' como fallback
        const role = (req.body.role === 'admin' || req.body.role === 'user') ? req.body.role : 'user';

        const newUser = {
            username: req.body.username,
            password: hashedPassword,
            role: role,
        };

        User.create(newUser, (err, userId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            // Se for auto-cadastro (usuário não logado), redireciona para o login
            if (!req.user) {
                return res.redirect('/auth/login?error=' + encodeURIComponent('Cadastro realizado com sucesso! Faça login para entrar.'));
            }

            res.redirect('/users');
        });
    },

    getUserById: (req, res) => {
        const userId = req.params.id;

        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('users/show', { user });
        });
    },

    getAllUsers: (req, res) => {
        User.getAll((err, users) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('users/index', { users });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    renderEditForm: (req, res) => {
        const userId = req.params.id;

        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('users/edit', { user });
        });
    },

    updateUser: (req, res) => {
        const userId = req.params.id;
        let password = req.body.password;

        if (password && !password.startsWith('$2a$') && !password.startsWith('$2b$')) {
            password = bcrypt.hashSync(password, 10);
        }

        const updatedUser = {
            username: req.body.username,
            password: password,
            role: req.body.role,
        };

        User.update(userId, updatedUser, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/users');
        });
    },

    deleteUser: (req, res) => {
        const userId = req.params.id;

        User.delete(userId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/users');
        });
    },

    searchUsers: (req, res) => {
        const search = req.query.search || '';

        User.searchByName(search, (err, users) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ users });
        });
    },
};

module.exports = userController;
