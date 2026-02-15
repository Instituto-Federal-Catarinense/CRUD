const { User } = require('../models/userModel');

const userController = {
    createUser: async (req, res) => {
        try {
            const newUser = { username: req.body.username, password: req.body.password, role: req.body.role };
            await User.create(newUser);
            res.redirect('/users');
        } catch (err) {
            return res.status(500).json({ error: err });
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
            return res.status(500).json({ error: err });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.render('users/index', { users });
        } catch (err) {
            return res.status(500).json({ error: err });
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
            return res.status(500).json({ error: err });
        }
    },

    updateUser: async (req, res) => {
        try {
            const updatedUser = { ...req.body };
            await User.update(updatedUser, { where: { id: req.params.id } });
            res.redirect('/users');
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.destroy({ where: { id: req.params.id } });
            res.redirect('/users');
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    },

    searchUsers: async (req, res) => {
        try {
            const search = req.query.search || '';
            const users = await User.findAll({
                where: {
                    username: {
                        [Sequelize.Op.like]: `%${search}%`
                    }
                }
            });
            res.json({ users });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }
};

module.exports = userController;
