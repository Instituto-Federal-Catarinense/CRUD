const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const hashPasswordIfNeeded = async (password, existingPassword = null) => {
    if (!password) {
        return existingPassword;
    }

    if (password.startsWith('$2')) {
        return password;
    }

    return bcrypt.hash(password, 10);
};

const userController = {
    createUser: async (req, res) => {
        try {
            const hashedPassword = await hashPasswordIfNeeded(req.body.password);

            const newUser = {
                username: req.body.username,
                password: hashedPassword,
                role: req.body.role,
            };

            User.create(newUser, (err, userId) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.redirect('/users');
            });
        } catch (error) {
            return res.status(500).json({ error });
        }
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

    updateUser: async (req, res) => {
        const userId = req.params.id;

        try {
            User.findById(userId, async (err, user) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const hashedPassword = await hashPasswordIfNeeded(req.body.password, user.password);

                const updatedUser = {
                    username: req.body.username,
                    password: hashedPassword,
                    role: req.body.role,
                };

                User.update(userId, updatedUser, (updateErr) => {
                    if (updateErr) {
                        return res.status(500).json({ error: updateErr });
                    }
                    res.redirect('/users');
                });
            });
        } catch (error) {
            return res.status(500).json({ error });
        }
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
