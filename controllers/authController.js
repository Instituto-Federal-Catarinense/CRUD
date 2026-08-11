const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const authController = {
    renderLoginForm: (req, res) => {
        const error = req.query.error || null;
        res.render('login', { error });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.redirect('/login?error=Informe usuário e senha');
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.redirect('/login?error=Usuário ou senha inválidos');
            }

            const comparePassword = (storedPassword, plainPassword, callback) => {
                if (typeof storedPassword === 'string' && storedPassword.startsWith('$2')) {
                    bcrypt.compare(plainPassword, storedPassword, callback);
                } else {
                    callback(null, plainPassword === storedPassword);
                }
            };

            comparePassword(user.password, password, (compareError, isMatch) => {
                if (compareError) {
                    return res.status(500).json({ error: compareError });
                }
                if (!isMatch) {
                    return res.redirect('/login?error=Usuário ou senha inválidos');
                }

                req.session.user = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                };
                res.redirect('/');
            });
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/login');
        });
    },
};

module.exports = authController;
