const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {
    renderLogin: (req, res) => {
        res.render('auth/login', { error: null });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            if (!user) {
                return res.status(401).render('auth/login', { error: 'Usuário ou senha inválidos.' });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }

                const validPassword = result || password === user.password;
                if (!validPassword) {
                    return res.status(401).render('auth/login', { error: 'Usuário ou senha inválidos.' });
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
};

module.exports = authController;
