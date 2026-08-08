const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {
    renderLogin: (req, res) => {
        if (req.session && req.session.user) {
            return res.redirect('/');
        }

        res.render('auth/login', {
            error: null,
            username: ''
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).render('auth/login', {
                error: 'Informe usuário e senha.',
                username: username || ''
            });
        }

        User.findByUsername(username, async (err, user) => {
            if (err) {
                console.error('Erro ao buscar usuário:', err);
                return res.status(500).render('auth/login', {
                    error: 'Erro interno ao realizar login.',
                    username
                });
            }

            if (!user) {
                return res.status(401).render('auth/login', {
                    error: 'Usuário ou senha inválidos.',
                    username
                });
            }

            try {
                let passwordValid = false;
                let shouldUpgradePassword = false;

                // Compatibilidade com usuários antigos que possuem senha em texto puro.
                // Novos usuários e senhas alteradas são sempre armazenados com bcrypt.
                if (typeof user.password === 'string' && user.password.startsWith('$2')) {
                    passwordValid = await bcrypt.compare(password, user.password);
                } else {
                    passwordValid = password === user.password;
                    shouldUpgradePassword = passwordValid;
                }

                if (!passwordValid) {
                    return res.status(401).render('auth/login', {
                        error: 'Usuário ou senha inválidos.',
                        username
                    });
                }

                if (shouldUpgradePassword) {
                    const hashedPassword = await bcrypt.hash(password, 12);
                    User.updatePassword(user.id, hashedPassword, (updateErr) => {
                        if (updateErr) {
                            console.error('Não foi possível atualizar a senha:', updateErr);
                        }
                    });
                }

                req.session.regenerate((sessionErr) => {
                    if (sessionErr) {
                        console.error('Erro ao criar sessão:', sessionErr);
                        return res.status(500).render('auth/login', {
                            error: 'Não foi possível iniciar a sessão.',
                            username
                        });
                    }

                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    };

                    req.session.save((saveErr) => {
                        if (saveErr) {
                            console.error('Erro ao salvar sessão:', saveErr);
                            return res.status(500).render('auth/login', {
                                error: 'Não foi possível salvar a sessão.',
                                username
                            });
                        }

                        res.redirect('/');
                    });
                });
            } catch (passwordError) {
                console.error('Erro ao validar senha:', passwordError);
                return res.status(500).render('auth/login', {
                    error: 'Erro interno ao realizar login.',
                    username
                });
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao destruir sessão:', err);
                return res.status(500).send('Não foi possível sair da conta.');
            }

            res.clearCookie('connect.sid');
            res.redirect('/auth/login');
        });
    }
};

module.exports = authController;
