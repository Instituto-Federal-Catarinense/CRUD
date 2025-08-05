const { User } = require('../models'); // Ajuste conforme seu index.js dos models
const { Op } = require('sequelize');

const userController = {
    createUser: async (req, res) => {
        try {
            const { username, password, role } = req.body;
            await User.create({ username, password, role });
            res.redirect('/users');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('users/show', { user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.render('users/index', { users });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.render('users/edit', { user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const [updated] = await User.update(
                { username, password, role },
                { where: { id: req.params.id } }
            );
            if (!updated) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.redirect('/users');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deleted = await User.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.redirect('/users');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchUsers: async (req, res) => {
        try {
            const search = req.query.search || '';
            const users = await User.findAll({
                where: {
                    username: {
                        [Op.like]: `%${search}%`
                    }
                }
            });
            res.json({ users });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = userController;
