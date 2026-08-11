// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const AuthController = {
    // Página de login
    showLogin: (req, res) => {
        res.render('login', { 
            title: 'Login',
            error: req.query.error || null,
            success: req.query.success || null
        });
    },

    // Processar login
    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('login', {
                title: 'Login',
                error: 'Usuário e senha são obrigatórios'
            });
        }

        User.findByUsername(username, (err, user) => {
            if (err || !user) {
                return res.render('login', {
                    title: 'Login',
                    error: 'Credenciais inválidas'
                });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    return res.render('login', {
                        title: 'Login',
                        error: 'Credenciais inválidas'
                    });
                }

                // Criar sessão
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.role = user.role;

                // CORRIGIDO: redirecionar para /auth/dashboard
                res.redirect('/auth/dashboard');
            });
        });
    },

    // Página de registro
    showRegister: (req, res) => {
        res.render('register', {
            title: 'Registro',
            error: null
        });
    },

    // Processar registro
    register: (req, res) => {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password || !confirmPassword) {
            return res.render('register', {
                title: 'Registro',
                error: 'Todos os campos são obrigatórios'
            });
        }

        if (password !== confirmPassword) {
            return res.render('register', {
                title: 'Registro',
                error: 'As senhas não coincidem'
            });
        }

        if (password.length < 6) {
            return res.render('register', {
                title: 'Registro',
                error: 'A senha deve ter pelo menos 6 caracteres'
            });
        }

        User.findByUsername(username, (err, existingUser) => {
            if (err) {
                return res.render('register', {
                    title: 'Registro',
                    error: 'Erro ao verificar usuário'
                });
            }

            if (existingUser) {
                return res.render('register', {
                    title: 'Registro',
                    error: 'Este usuário já está cadastrado'
                });
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.render('register', {
                        title: 'Registro',
                        error: 'Erro ao processar senha'
                    });
                }

                const newUser = {
                    username: username,
                    password: hash,
                    role: 'user'
                };

                User.create(newUser, (err, userId) => {
                    if (err) {
                        return res.render('register', {
                            title: 'Registro',
                            error: 'Erro ao criar usuário'
                        });
                    }

                    res.redirect('/auth/login?success=Usuário criado com sucesso! Faça login.');
                });
            });
        });
    },

    // Logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Erro ao fazer logout');
            }
            res.redirect('/auth/login');
        });
    },

    // Dashboard
    dashboard: (req, res) => {
        res.render('dashboard', {
            title: 'Dashboard',
            user: {
                username: req.session.username,
                role: req.session.role
            }
        });
    }
};

module.exports = AuthController;