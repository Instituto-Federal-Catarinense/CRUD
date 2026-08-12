const bcrypt = require("bcrypt");
const User = require('../models/userModel');

const userController = {
   createUser: async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Criptografa a senha antes de salvar
        const senhaHash = await bcrypt.hash(password, 10);

        const newUser = {
            username: username,
            password: senhaHash,
            role: role
        };

        User.create(newUser, (err, userId) => {
            if (err) {
                console.error("Erro ao criar usuário:", err);
                return res.status(500).send("Erro ao cadastrar usuário.");
            }

            console.log("Usuário criado:", userId);

            res.redirect('/users');
        });

    } catch (err) {
        console.error("Erro:", err);
        res.status(500).send("Erro ao cadastrar usuário.");
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
        try {
            const userId = req.params.id;

            const senhaHash = await bcrypt.hash(req.body.password, 10);

            const updatedUser = {
                username: req.body.username,
                password: senhaHash,
                role: req.body.role,
            };

            User.update(userId, updatedUser, (err) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.redirect('/users');
            });
        } catch (err) {
            res.status(500).json({ error: err });
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