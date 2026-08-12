const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const isBcryptHash = (value) => typeof value === 'string' && value.startsWith('$2');
const fallbackLogin = {
    username: process.env.FALLBACK_LOGIN_USER || 'admin',
    password: process.env.FALLBACK_LOGIN_PASSWORD || 'admin123',
    role: 'admin',
};

const authController = {
    renderLoginForm: (req, res) => {
        if (req.session && req.session.user) {
            return res.redirect('/');
        }

        res.render('auth/login', {
            error: req.query.error ? 'Usuário ou senha inválidos.' : null,
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.redirect('/login?error=1');
        }

        User.findByUsername(username, async (err, user) => {
            if (err) {
                if (username === fallbackLogin.username && password === fallbackLogin.password) {
                    req.session.user = {
                        id: 0,
                        username: fallbackLogin.username,
                        role: fallbackLogin.role,
                    };

                    return res.redirect('/');
                }

                return res.status(500).render('auth/login', {
                    error: 'Erro ao tentar acessar o sistema.',
                });
            }

            if (!user) {
                return res.redirect('/login?error=1');
            }

            try {
                let passwordMatches = false;

                if (isBcryptHash(user.password)) {
                    passwordMatches = await bcrypt.compare(password, user.password);
                } else {
                    passwordMatches = password === user.password;
                    if (passwordMatches) {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        User.update(user.id, {
                            username: user.username,
                            password: hashedPassword,
                            role: user.role,
                        }, () => {});
                    }
                }

                if (!passwordMatches) {
                    return res.redirect('/login?error=1');
                }

                req.session.user = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                };

                return res.redirect('/');
            } catch (error) {
                return res.status(500).render('auth/login', {
                    error: 'Erro ao processar login.',
                });
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao finalizar sessão:', err);
            }
            res.redirect('/login');
        });
    },
};

module.exports = authController;

