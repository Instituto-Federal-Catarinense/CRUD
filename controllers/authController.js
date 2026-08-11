const User = require('../models/userModel');

const authController = {
    // Exibe a página de login.
    renderLoginForm: (req, res) => {
        res.render('login', { error: null });
    },

    // Processa o login do usuário.
    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).render('login', { error: 'Erro ao acessar o banco de dados.' });
            }

            if (!user || user.password !== password) {
                return res.status(401).render('login', { error: 'Usuário ou senha inválidos.' });
            }

            // Salva os dados do usuário na sessão.
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            return res.redirect('/');
        });
    },

    // Finaliza a sessão e faz logout.
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao encerrar a sessão:', err);
            }
            res.redirect('/login');
        });
    }
};

module.exports = authController;
