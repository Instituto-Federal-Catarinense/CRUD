const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {
    // Exibe o formulário de login
    renderLogin: (req, res) => {
        if (req.session.user) {
            return res.redirect('/');
        }
        res.render('auth/login', { erro: null });
    },

    // Processa o login
    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).render('auth/login', { erro: 'Informe usuário e senha.' });
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                console.error('Erro ao buscar usuário:', err);
                return res.status(500).render('auth/login', { erro: 'Erro ao acessar o banco de dados.' });
            }

            if (!user) {
                return res.status(401).render('auth/login', { erro: 'Usuário ou senha inválidos.' });
            }

            bcrypt.compare(password, user.password, (err, senhaCorreta) => {
                if (err || !senhaCorreta) {
                    return res.status(401).render('auth/login', { erro: 'Usuário ou senha inválidos.' });
                }

                // Regenera a sessão para evitar session fixation
                req.session.regenerate((err) => {
                    if (err) {
                        console.error('Erro ao criar sessão:', err);
                        return res.status(500).render('auth/login', { erro: 'Erro ao criar sessão.' });
                    }

                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                    };

                    const destino = req.session.returnTo || '/';
                    delete req.session.returnTo;
                    res.redirect(destino);
                });
            });
        });
    },

    // Encerra a sessão
    logout: (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    },
};

module.exports = authController;
