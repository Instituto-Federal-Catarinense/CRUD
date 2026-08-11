const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const authController = {
    renderLogin: (req, res) => {
        res.render('auth/login', { error: null });
    },
    
    login: (req, res) => {
        const { username, password } = req.body;
        User.findByUsername(username, (err, user) => {
            if (err || !user) {
                return res.render('auth/login', { error: 'Usuário ou senha inválidos' });
            }
            
            const isMatch = password === user.password;
            if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
                bcrypt.compare(password, user.password, (err, match) => {
                    if (match) {
                        req.session.userId = user.id;
                        req.session.username = user.username;
                        req.session.role = user.role;
                        res.redirect('/produtos');
                    } else {
                        res.render('auth/login', { error: 'Usuário ou senha inválidos' });
                    }
                });
            } else {
                if (isMatch) {
                    req.session.userId = user.id;
                    req.session.username = user.username;
                    req.session.role = user.role;
                    res.redirect('/produtos');
                } else {
                    res.render('auth/login', { error: 'Usuário ou senha inválidos' });
                }
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            res.redirect('/auth/login');
        });
    }
};

module.exports = authController;
