const User = require('../models/userModel');

const registerController = {
    // Renderiza a página de registro
    renderRegisterForm: (req, res) => {
        res.render('register', { title: 'Cadastro', error: null });
    },

    // Processa o registro de novo usuário
    register: (req, res) => {
        const { username, password, passwordConfirm } = req.body;

        // Validações básicas
        if (!username || !password || !passwordConfirm) {
            return res.render('register', { 
                title: 'Cadastro',
                error: 'Por favor, preencha todos os campos'
            });
        }

        if (password !== passwordConfirm) {
            return res.render('register', { 
                title: 'Cadastro',
                error: 'As senhas não correspondem'
            });
        }

        if (password.length < 4) {
            return res.render('register', { 
                title: 'Cadastro',
                error: 'A senha deve ter pelo menos 4 caracteres'
            });
        }

        // Verificar se usuário já existe
        User.findByUsername(username, (err, existingUser) => {
            if (err) {
                return res.render('register', { 
                    title: 'Cadastro',
                    error: 'Erro ao verificar usuário'
                });
            }

            if (existingUser) {
                return res.render('register', { 
                    title: 'Cadastro',
                    error: 'Nome de usuário já existe'
                });
            }

            // Criar novo usuário (role padrão: 'user')
            const newUser = {
                username: username,
                password: password,
                role: 'user'
            };

            User.create(newUser, (err, userId) => {
                if (err) {
                    return res.render('register', { 
                        title: 'Cadastro',
                        error: 'Erro ao criar usuário'
                    });
                }

                // Redirecionar para login com mensagem de sucesso
                res.redirect('/login?registered=true');
            });
        });
    },
};

module.exports = registerController;