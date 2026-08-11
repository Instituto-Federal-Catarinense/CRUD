const User = require('../models/userModel');

const authController = {
    // Exibe a tela de login para o usuário.
    renderLoginForm: (req, res) => {
        res.render('login', { error: null });
    },

    // Valida usuário e senha e cria a sessão do usuário autenticado.
    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).render('login', { error: 'Erro ao consultar usuário.' });
            }

            if (!user || user.password !== password) {
                return res.status(401).render('login', { error: 'Usuário ou senha inválidos.' });
            }

            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
            };

            req.saveSession();
            res.redirect('/');
        });
    },

    // Encerra a sessão atual e redireciona para a tela de login.
    logout: (req, res) => {
        req.clearSession();
        res.redirect('/login');
    },
};

module.exports = authController;
