const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const loginController = {
    // Renderiza a página de login
    renderLoginForm: (req, res) => {
        res.render('login', { 
            title: 'Login', 
            error: null,
            registered: req.query.registered === 'true'
        });
    },

    // Processa o login e retorna um token JWT
    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.render('login', { 
                    title: 'Login',
                    error: 'Erro ao buscar usuário'
                });
            }

            if (!user || user.password !== password) {
                return res.render('login', { 
                    title: 'Login',
                    error: 'Username ou password inválidos'
                });
            }

            // Gerar token JWT
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET || 'sua_chave_secreta_jwt',
                { expiresIn: '24h' }
            );

            // Armazenar token na sessão também (para falback)
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
                token: token
            };

            res.redirect('/');
        });
    },

    // Logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao fazer logout' });
            }
            res.redirect('/login');
        });
    },
};

module.exports = loginController;
