
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');


// ==========================================
// PÁGINA DE LOGIN
// ==========================================

router.get('/', (req, res) => {
    res.render('login');
});


// ==========================================
// FAZER LOGIN
// ==========================================

router.post('/', (req, res) => {

    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {

        if (err) {
            return res.status(500).send('Erro no servidor');
        }

        // Verifica usuário e senha
        if (!user || user.password !== password) {
            return res.status(401).send('Usuário ou senha incorretos');
        }

        // Salva o usuário na sessão
        req.session.usuario = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        // Redireciona para a página inicial
        res.redirect('/');
    });
});


// ==========================================
// LOGOUT
// ==========================================

router.get('/logout', (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            console.log('Erro ao fazer logout:', err);

            return res.status(500).send('Erro ao fazer logout');
        }

        // Remove o cookie da sessão
        res.clearCookie('connect.sid');

        // Volta para a página de login
        res.redirect('/login');
    });

});


module.exports = router;