const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {
    renderLogin: (req, res) => {
        if (req.session.user) {
            return res.redirect('/');
        }

        res.render('auth/login', {
            error: null,
            username: ''
        });
    },

    login: (req, res) => {
        const username = (req.body.username || '').trim();
        const password = req.body.password || '';

        if (!username || !password) {
            return res.status(400).render('auth/login', {
                error: 'Informe usuário e senha.',
                username
            });
        }

        User.findByUsername(username, async (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).render('auth/login', {
                    error: 'Erro ao consultar o usuário.',
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
                // Aceita senhas antigas em texto puro para facilitar a migração.
                // Após um login válido de uma senha antiga, ela é convertida para bcrypt.
                const isHash = typeof user.password === 'string' &&
                    user.password.startsWith('$2');

                const validPassword = isHash
                    ? await bcrypt.compare(password, user.password)
                    : password === user.password;

                if (!validPassword) {
                    return res.status(401).render('auth/login', {
                        error: 'Usuário ou senha inválidos.',
                        username
                    });
                }

                if (!isHash) {
                    const newHash = await bcrypt.hash(password, 10);
                    User.updatePassword(user.id, newHash, (hashErr) => {
                        if (hashErr) console.error('Não foi possível atualizar a senha:', hashErr);
                    });
                }

                // Regenera o ID da sessão após autenticação.
                req.session.regenerate((sessionErr) => {
                    if (sessionErr) {
                        console.error(sessionErr);
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
                            console.error(saveErr);
                            return res.status(500).render('auth/login', {
                                error: 'Não foi possível salvar a sessão.',
                                username
                            });
                        }

                        res.redirect('/');
                    });
                });
            } catch (compareErr) {
                console.error(compareErr);
                res.status(500).render('auth/login', {
                    error: 'Erro ao autenticar.',
                    username
                });
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Não foi possível encerrar a sessão.');
            }

            res.clearCookie('connect.sid');
            res.redirect('/auth/login');
        });
    }
};

module.exports = authController;
