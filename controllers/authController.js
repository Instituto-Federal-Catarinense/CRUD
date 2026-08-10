const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {
    renderLoginForm: (req, res) => {
        const error = req.query.error || null;
        res.render('auth/login', { error });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('auth/login', { error: 'Por favor, preencha o nome de usuário e a senha.' });
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            if (!user) {
                return res.render('auth/login', { error: 'Usuário ou senha incorretos.' });
            }

            // Suporte duplo: verifica com bcrypt ou texto puro (para compatibilidade com usuários cadastrados anteriormente)
            let isPasswordValid = false;
            if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
                isPasswordValid = bcrypt.compareSync(password, user.password);
            } else {
                isPasswordValid = (password === user.password);
            }

            if (!isPasswordValid) {
                return res.render('auth/login', { error: 'Usuário ou senha incorretos.' });
            }

            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            const secret = process.env.JWT_SECRET || 'crud_jwt_secret_key_2026_super_secure';
            const expiresIn = process.env.JWT_EXPIRES_IN || '8h';

            const token = jwt.sign(payload, secret, { expiresIn });

            // Armazena o JWT em um cookie HTTP-Only para segurança e facilidade na navegação EJS
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 8 * 60 * 60 * 1000 // 8 horas
            });

            res.redirect('/');
        });
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
};

module.exports = authController;
