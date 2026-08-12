const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userController = {
    createUser: async (req, res) => {

    try {

        const senhaCriptografada = await bcrypt.hash(
            req.body.password,
            10
        );

        const newUser = {
            username: req.body.username,
            password: senhaCriptografada,
            role: req.body.role,
        };

        User.create(newUser, (err, userId) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            res.redirect('/users');
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Erro ao criar usuário.'
        });
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

    updateUser: (req, res) => {
        const userId = req.params.id;
        const updatedUser = {
            username: req.body.username,
            password: req.body.password,
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
