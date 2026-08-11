const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {
    createUser: (req, res) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const role = req.body.role || 'user';

        const newUser = {
            username: req.body.username,
            password: hashedPassword,
            role: role,
        };

        User.create(newUser, (err, userId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (req.user && req.user.role === 'admin') {
                res.redirect('/users');
            } else {
                res.redirect('/login');
            }
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
        let hashedPassword = req.body.password;
        if (req.body.password && !req.body.password.startsWith('$2a$') && !req.body.password.startsWith('$2b$')) {
            hashedPassword = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role || 'user',
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
