const User = require('../models/userModel');

const authController = {
    renderLogin: (req, res) => {
        if (req.session && req.session.user) {
            return res.redirect('/produtos');
        }
        res.render('login', { error: null });
    },

    login: (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.render('login', { error: 'Por favor, informe usuário e senha.' });
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.render('login', { error: 'Erro ao verificar credenciais.' });
            }
            if (!user || user.password !== password) {
                return res.render('login', { error: 'Usuário ou senha incorretos.' });
            }

            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            res.redirect('/produtos');
        });
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
};

module.exports = authController;
