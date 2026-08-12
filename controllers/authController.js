const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

const authController = {
    showLogin: (req, res) => {
        res.render('auth/login', { error: null });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('auth/login', { error: 'Preencha todos os campos.' });
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.render('auth/login', { error: 'Usuário ou senha inválidos.' });
            }

            User.verifyPassword(password, user.password, (verifyErr, match) => {
                if (verifyErr) {
                    return res.status(500).json({ error: verifyErr });
                }
                if (!match) {
                    return res.render('auth/login', { error: 'Usuário ou senha inválidos.' });
                }

                const token = jwt.sign(
                    { id: user.id, username: user.username, role: user.role },
                    JWT_SECRET,
                    { expiresIn: JWT_EXPIRES_IN }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 2 * 60 * 60 * 1000,
                });

                res.redirect('/');
            });
        });
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/auth/login');
    },
};

module.exports = authController;
