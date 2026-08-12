const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {

    showLogin: (req, res) => {
        res.render('login/index', { error: null });
    },

    login: (req, res) => {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('login/index', {
                error: 'Preencha usuário e senha.'
            });
        }

        User.findByUsername(username, async (err, user) => {

            if (err) {
                console.error(err);

                return res.status(500).render('login/index', {
                    error: 'Erro ao acessar o banco de dados.'
                });
            }

            if (!user) {
                return res.render('login/index', {
                    error: 'Usuário ou senha incorretos.'
                });
            }

            const senhaCorreta = await bcrypt.compare(
                password,
                user.password
            );

            if (!senhaCorreta) {
                return res.render('login/index', {
                    error: 'Usuário ou senha incorretos.'
                });
            }

            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.role = user.role;

            res.redirect('/');
        });
    },

    logout: (req, res) => {

        req.session.destroy((err) => {

            if (err) {
                return res.status(500).send('Erro ao sair.');
            }

            res.redirect('/login');
        });
    }
};

module.exports = authController;