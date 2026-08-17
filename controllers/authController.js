const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secret = process.env.JWT_SECRET || 'change_this_secret';

const authController = {
    renderLoginForm: (req, res) => {
        if (req.user) {
            return res.redirect('/users');
        }
        res.render('login', { error: null });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('login', { error: 'Informe usuário e senha.' });
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).render('login', { error: 'Erro interno. Tente novamente.' });
            }
            if (!user) {
                return res.render('login', { error: 'Usuário ou senha inválidos.' });
            }

            bcrypt.compare(password, user.password, (compareErr, isMatch) => {
                if (compareErr) {
                    return res.status(500).render('login', { error: 'Erro interno. Tente novamente.' });
                }

                const isValid = isMatch || password === user.password;
                if (!isValid) {
                    return res.render('login', { error: 'Usuário ou senha inválidos.' });
                }

                const token = jwt.sign(
                    { id: user.id, username: user.username, role: user.role },
                    secret,
                    { expiresIn: '8h' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 8 * 60 * 60 * 1000,
                });

                return res.redirect('/users');
            });
        });
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/auth/login');
    },
};

module.exports = authController;
