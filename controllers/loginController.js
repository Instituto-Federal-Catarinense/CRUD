const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const loginController = {
    renderLoginForm: (req, res) => {
        res.render('login/index'); // Renderiza a view 'index.ejs' na pasta 'login'
    },

    handleLogin: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (error, user) => {
            if (error) {
                return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
            }

            if (user) {
                // Compara a senha fornecida com a senha armazenada
                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erro ao comparar senhas' });
                    }

                    if (match) {
                        // Sucesso no login
                        req.session.userId = user.id; // Armazena o ID do usuário na sessão
                        req.session.role = user.role; // Armazena o papel do usuário
                        return res.redirect('/'); // Redireciona para a página inicial
                    } else {
                        // Senha incorreta
                        return res.status(401).json({ error: 'Credenciais incorretas' }); // Responde com erro
                    }
                });
            } else {
                // Usuário não encontrado
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao encerrar sessão' });
            }
            res.redirect('/login'); // Redireciona para a página de login
        });
    }
};

module.exports = loginController;
