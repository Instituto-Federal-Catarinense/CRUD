const User = require('../models/userModel');

const userController = {
    createUser: async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const newUser = await User.create({
                username,
                password,
                role
            });
            res.redirect('/users'); // Redireciona para a lista de usuários
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findOne({
                where: { id: userId }
            });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('users/show', { user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.render('users/index', { users });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findOne({
                where: { id: userId }
            });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('users/edit', { user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, password, role } = req.body;
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            user.username = username;
            user.password = password;
            user.role = role;
            await user.save();
            res.redirect('/users');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            await user.destroy();
            res.redirect('/users');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    },

    searchUsers: async (req, res) => {
        try {
            const search = req.query.search || '';
            const users = await User.findAll({
                where: {
                    username: {
                        [Op.like]: `%${search}%` // Operador LIKE do Sequelize para buscar por nome
                    }
                }
            });
            res.json({ users });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }
};

module.exports = userController;
