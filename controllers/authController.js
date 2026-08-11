const User = require('../models/userModel');
const { validateUserPayload } = require('../utils/validators');

const authController = {
    renderLoginForm: (req, res) => {
        res.render('auth/login');
    },

    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {
            if (err) {
                req.flash('danger', 'Erro ao autenticar usuário.');
                return res.redirect('/login');
            }

            if (!user || user.password !== password) {
                req.flash('danger', 'Credenciais inválidas.');
                return res.redirect('/login');
            }

            req.session.logado = true;
            req.session.user = { id: user.id, username: user.username, role: user.role };
            req.flash('success', 'Login realizado com sucesso.');
            return res.redirect('/');
        });
    },

    logout: (req, res) => {
        req.session.logado = false;
        req.session.user = null;
        req.flash('success', 'Logout realizado com sucesso.');
        res.redirect('/login');
    },

    register: (req, res) => {
        const errors = validateUserPayload(req.body);

        if (errors.length) {
            req.flash('danger', errors[0]);
            return res.redirect('/register');
        }

        const newUser = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role || 'user',
        };

        User.create(newUser, (err) => {
            if (err) {
                req.flash('danger', 'Não foi possível cadastrar o usuário.');
                return res.redirect('/register');
            }

            req.flash('success', 'Usuário cadastrado com sucesso.');
            return res.redirect('/login');
        });
    },
};

module.exports = authController;
