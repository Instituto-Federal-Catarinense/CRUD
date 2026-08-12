const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Página inicial
router.get('/', function(req, res) {
    res.render('index');
});

// Página de login
router.get('/login', function(req, res) {
    res.render('login');
});

// Fazer login
router.post('/login', userController.loginUser);

// Logout
router.get('/logout', function(req, res) {

    req.session.destroy(function() {
        res.redirect('/login');
    });

});

module.exports = router;