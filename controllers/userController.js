const User = require('../models/userModel');
const argon2 = require('argon2');
const { gerarToken } = require('../config/jwt');

const userController = {

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    createUser: async (req, res) => {

        try {

            const senhaHash = await argon2.hash(req.body.password);

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

    login: async (req, res) => {

        const { username, password } = req.body;

        try {
            const user = await new Promise((resolve, reject) => {
                User.findByUsername(username, (err, user) => {
                    if (err) return reject(err);
                    resolve(user);
                });
            });

            if (!user)
                return res.status(401).send("Credenciais inválidas");

            const same = await argon2.verify(user.password, password);

            if (!same)
                return res.status(401).send("Credenciais inválidas");

            const token = gerarToken(user);

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 30 * 60 * 1000
            });

            res.redirect('/');
        } catch (err) {
            return res.status(500).send(err);
        }

    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/users/login');
    },
    registerForm: (req, res) => {
    res.render("users/register");
},

register: async (req, res) => {

    try {

        const senha = await argon2.hash(req.body.password);

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
                password: await argon2.hash(req.body.password),
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
