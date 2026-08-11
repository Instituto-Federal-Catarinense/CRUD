const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {
    renderLoginForm: (req, res) => {
        if (req.user) {
            return res.redirect('/');
        }
        res.render('auth/login', { error: null });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('auth/login', { error: 'Por favor, preencha todos os campos.' });
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            if (!user) {
                return res.render('auth/login', { error: 'Usuário ou senha incorretos.' });
            }

            // Suporta tanto senha com hash bcrypt quanto texto plano (compatibilidade retroativa)
            let isPasswordValid = false;
            if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
                isPasswordValid = bcrypt.compareSync(password, user.password);
            } else {
                isPasswordValid = (password === user.password);
            }

            if (!isPasswordValid) {
                return res.render('auth/login', { error: 'Usuário ou senha incorretos.' });
            }

            // Gerar Token JWT
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: '1d' }
            );

            // Armazenar token em cookie HTTP-Only
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 1 dia
            });

            res.redirect('/');
        });
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/login');
    }
};

module.exports = authController;
