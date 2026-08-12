const User = require('../models/userModel');

const authController = {
    renderLoginForm: (req, res) => {
        if (req.session && req.session.user) {
            return res.redirect('/');
        }

        res.render('auth/login', { error: null });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).render('auth/login', {
                error: 'Preencha usuário e senha.'
            });
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).render('auth/login', {
                    error: 'Erro ao tentar acessar o sistema.'
                });
            }

            if (!user || user.password !== password) {
                return res.status(401).render('auth/login', {
                    error: 'Usuário ou senha inválidos.'
                });
            }

            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
            };

            return res.redirect('/');
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao finalizar sessão:', err);
            }
            res.redirect('/login');
        });
    }
};

module.exports = authController;
