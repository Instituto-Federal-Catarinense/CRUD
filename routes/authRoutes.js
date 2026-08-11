const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Página de login
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    const error = req.query.error || null;
    res.render('login', {
        title: 'Login',
        error
    });
});

// Processar login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('login', {
            title: 'Login',
            error: 'Informe usuário e senha'
        });
    }

    User.findByUsername(username, (err, results) => {
        if (err) {
            console.error(err);
            return res.render('login', {
                title: 'Login',
                error: 'Erro ao processar login'
            });
        }

        if (!results || results.length === 0) {
            return res.render('login', {
                title: 'Login',
                error: 'Usuário não encontrado'
            });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.render('login', {
                title: 'Login',
                error: 'Senha incorreta'
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        req.session.save((err) => {
            if (err) {
                console.error(err);
                return res.render('login', {
                    title: 'Login',
                    error: 'Erro ao criar sessão'
                });
            }
            res.redirect('/');
        });
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
        }
        res.redirect('/auth/login');
    });
});

// Página de registro (opcional)
router.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('register', {
        title: 'Registro',
        error: null
    });
});

// Processar registro
router.post('/register', (req, res) => {
    const { username, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.render('register', {
            title: 'Registro',
            error: 'Senhas não conferem'
        });
    }

    User.findByUsername(username, (err, results) => {
        if (err) {
            console.error(err);
            return res.render('register', {
                title: 'Registro',
                error: 'Erro ao verificar usuário'
            });
        }

        if (results && results.length > 0) {
            return res.render('register', {
                title: 'Registro',
                error: 'Usuário já existe'
            });
        }

        User.create({
            username,
            password,
            role: role || 'user'
        }, (err) => {
            if (err) {
                console.error(err);
                return res.render('register', {
                    title: 'Registro',
                    error: 'Erro ao criar usuário'
                });
            }

            res.redirect('/auth/login');
        });
    });
});

module.exports = router;