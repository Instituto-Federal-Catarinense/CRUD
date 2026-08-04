const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userController = {
    createUser: (req, res) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role || 'user',
        };

        User.create(newUser, (err, userId) => {
            if (err) {
                return res.status(500).json({ error: err });
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
        
        User.findById(userId, (err, existingUser) => {
            if (err || !existingUser) {
                return res.status(500).json({ error: err || 'Usuário não encontrado' });
            }

            let password = existingUser.password;
            if (req.body.password && req.body.password.trim() !== '') {
                password = bcrypt.hashSync(req.body.password, 10);
            }

            const updatedUser = {
                username: req.body.username,
                password: password,
                role: req.body.role || existingUser.role,
            };

            User.update(userId, updatedUser, (err) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.redirect('/users');
            });
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
