const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    createUser: async (req, res) => {

        try {

            const senhaHash = await bcrypt.hash(req.body.password, 10);

            const newUser = {
                username: req.body.username,
                password: senhaHash,
                role: req.body.role
            };

            User.create(newUser, (err) => {

                if (err)
                    return res.status(500).send(err);

                res.redirect('/users');
            });

        } catch (err) {

            res.status(500).send(err);

        }

    },

    loginForm: (req, res) => {

        res.render('users/login');

    },

    login: (req, res) => {

        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {

            if (err)
                return res.status(500).send(err);

            if (!user)
                return res.status(401).send("Credenciais inválidas");

            bcrypt.compare(password, user.password, (err, same) => {

                if (err)
                    return res.status(500).send(err);

                if (!same)
                    return res.status(401).send("Credenciais inválidas");

                req.session.usuario = {
                    id: user.id,
                    username: user.username,
                    role: user.role
                };

                res.redirect('/');

            });

        });

    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Erro ao fazer logout");
            }
            res.clearCookie('connect.sid');
            res.redirect('/users/login');
        });
    },
    registerForm: (req, res) => {
    res.render("users/register");
},

register: async (req, res) => {

    try {

        const senha = await bcrypt.hash(req.body.password, 10);

        const novoUsuario = {
            username: req.body.username,
            password: senha,
            role: "user"
        };

        User.create(novoUsuario, (err) => {

            if (err)
                return res.send(err);

            res.redirect("/users/login");

        });

    } catch (err) {

        res.send(err);

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
            const updatedUser = {
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
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
