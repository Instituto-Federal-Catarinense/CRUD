const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {
    renderLogin: (req, res) => {
        if (req.session && req.session.user) {
            return res.redirect('/');
        }
        res.render('auth/login', { title: 'Login' });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            req.session.error = 'Por favor, preencha todos os campos.';
            return res.redirect('/login');
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                req.session.error = 'Erro interno do servidor ao autenticar.';
                return res.redirect('/login');
            }

            if (!user) {
                req.session.error = 'Usuário ou senha inválidos.';
                return res.redirect('/login');
            }

            let isValidPassword = false;
            if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
                isValidPassword = bcrypt.compareSync(password, user.password);
            } else {
                isValidPassword = (password === user.password);
            }

            if (!isValidPassword) {
                req.session.error = 'Usuário ou senha inválidos.';
                return res.redirect('/login');
            }

            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
            };

            const redirectTo = req.session.returnTo || '/';
            delete req.session.returnTo;
            res.redirect(redirectTo);
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao encerrar sessão:', err);
            }
            res.redirect('/login');
        });
    },
};

module.exports = authController;
