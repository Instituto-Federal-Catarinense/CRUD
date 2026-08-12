const User = require('../models/userModel');

const userController = {

    createUser: (req, res) => {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };

        User.create(newUser, (err, userId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            res.redirect('/users');
        });
    },

    getUserById: (req, res) => {
        const userId = req.params.id;

        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.render('users/show', { user });
        });
    },

    getAllUsers: (req, res) => {
        User.getAll((err, users) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            res.render('users/index', { users });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('users/create');
    },

    renderEditForm: (req, res) => {
        const userId = req.params.id;

        User.findById(userId, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.render('users/edit', { user });
        });
    },

    updateUser: (req, res) => {
        const userId = req.params.id;

        const updatedUser = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };

        User.update(userId, updatedUser, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            res.redirect('/users');
        });
    },

    deleteUser: (req, res) => {
        const userId = req.params.id;

        User.delete(userId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            res.redirect('/users');
        });
    },

    searchUsers: (req, res) => {
        const search = req.query.search || '';

        User.searchByName(search, (err, users) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            res.json({ users });
        });
    },

    // LOGIN
    loginUser: (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log('Username recebido:', username);
    console.log('Password recebida:', password);

    User.findByUsername(username, (err, user) => {

        if (err) {
            console.error('ERRO MYSQL:', err);
            return res.status(500).send(
                'Erro ao consultar o banco de dados'
            );
        }

        console.log('Usuário encontrado:', user);

        if (!user) {
            return res.send(
                'Usuário ou senha incorretos'
            );
        }

        console.log('Senha do banco:', user.password);
        console.log('Senha recebida:', password);

        if (user.password !== password) {
            return res.send(
                'Usuário ou senha incorretos'
            );
        }

        req.session.logado = true;
        req.session.usuario = user;

        res.redirect('/produtos');
    });
},

};

module.exports = userController;