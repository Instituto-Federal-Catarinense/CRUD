const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const authController = {
    renderLoginForm: (req, res) => {
        res.render('auth/login');
    },

    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.render('auth/login', { error: 'Usuário ou senha inválidos' });
            }

            bcrypt.compare(password, user.password, (compareErr, isMatch) => {
                if (compareErr) {
                    return res.status(500).json({ error: compareErr });
                }
                if (!isMatch) {
                    return res.render('auth/login', { error: 'Usuário ou senha inválidos' });
                }

                req.session.user = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                };
                res.redirect('/');
            });
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/login');
        });
    },

    renderRegisterForm: (req, res) => {
        res.render('auth/register');
    },

    register: (req, res) => {
        const { username, password, role } = req.body;

        User.findByUsername(username, (err, existingUser) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (existingUser) {
                return res.render('auth/register', { error: 'Usuário já existe' });
            }

            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                    return res.status(500).json({ error: hashErr });
                }

                const newUser = {
                    username,
                    password: hashedPassword,
                    role,
                };

                User.create(newUser, (createErr) => {
                    if (createErr) {
                        return res.status(500).json({ error: createErr });
                    }
                    res.redirect('/login');
                });
            });
        });
    },
};

module.exports = authController;
