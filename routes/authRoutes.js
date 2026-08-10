const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/authMiddleware');

// Login form
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Handle login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
        if (err) return res.status(500).json({ error: err });
        if (!user) {
            return res.status(401).render('login', { error: 'Credenciais inválidas' });
        }

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) return res.status(500).json({ error: err });
            if (!match) return res.status(401).render('login', { error: 'Credenciais inválidas' });

            const token = generateToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        });
    });
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;
