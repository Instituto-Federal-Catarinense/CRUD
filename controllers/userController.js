const User = require('../models/user.js');
const { Op } = require('sequelize');

const userController = {
    createUser: async (req, res) => {
        try {
            const newUser = {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
            };

            await User.create(newUser);
            res.redirect('/users');
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.render('users/show', { user });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                order: [['id', 'ASC']]
            });
            res.render('users/index', { users });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: error.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.render('users/edit', { user });
        } catch (error) {
            console.error('Error fetching user for edit:', error);
            res.status(500).json({ error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
            };

            const [updated] = await User.update(updatedUser, {
                where: { id: userId }
            });

            if (updated) {
                res.redirect('/users');
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const deleted = await User.destroy({
                where: { id: userId }
            });

            if (deleted) {
                res.redirect('/users');
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: error.message });
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
                },
                order: [['id', 'ASC']]
            });

            res.json({ users });
        } catch (error) {
            console.error('Error searching users:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = userController;