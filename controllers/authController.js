require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const getCookieMaxAge = (expiresIn) => {
    const normalized = expiresIn || '2h';

    if (/\d+s$/.test(normalized)) return Number.parseInt(normalized, 10) * 1000;
    if (/\d+m$/.test(normalized)) return Number.parseInt(normalized, 10) * 60 * 1000;
    if (/\d+h$/.test(normalized)) return Number.parseInt(normalized, 10) * 60 * 60 * 1000;

    return 2 * 60 * 60 * 1000;
};

const authController = {
    renderLoginForm: (req, res) => {
        if (req.user) {
            return res.redirect('/');
        }
        res.render('login', { error: null });
    },

    login: (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).render('login', { error: 'Preencha usuário e senha.' });
        }

        User.findByUsername(username, async (err, user) => {
            // DEBUG - remover depois
            console.log('--- DEBUG LOGIN ---');
            console.log('Username digitado:', JSON.stringify(username));
            console.log('Usuário encontrado no banco:', user);

            if (err) {
                console.log('Erro no findByUsername:', err);
                return res.status(500).render('login', { error: 'Erro interno ao autenticar.' });
            }
            if (!user) {
                console.log('Nenhum usuário encontrado com esse username.');
                return res.status(401).render('login', { error: 'Usuário ou senha inválidos.' });
            }

            let validPassword = false;

            try {
                validPassword = await bcrypt.compare(password, user.password);
                console.log('Senha digitada:', JSON.stringify(password));
                console.log('Hash salvo no banco:', user.password);
                console.log('Senha bate?', validPassword);
            } catch (compareError) {
                console.log('Erro no bcrypt.compare:', compareError);
                validPassword = false;
            }

            if (!validPassword && user.password === password) {
                console.log('Fallback: senha em texto puro batendo, vai re-hashear.');
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
                User.update(user.id, user, (updateErr) => {
                    if (updateErr) {
                        return res.status(500).render('login', { error: 'Erro ao atualizar a senha do usuário.' });
                    }

                    return finalizeLogin(user, res);
                });
                return;
            }

            if (!validPassword) {
                console.log('Login recusado: senha não confere.');
                return res.status(401).render('login', { error: 'Usuário ou senha inválidos.' });
            }

            console.log('Login OK, gerando token...');
            return finalizeLogin(user, res);
        });

        const finalizeLogin = (user, res) => {
            const expiresIn = process.env.JWT_EXPIRES_IN || '2h';
            const maxAge = getCookieMaxAge(expiresIn);
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge,
                expires: new Date(Date.now() + maxAge),
            });
            res.redirect('/');
        };
    },

    logout: (req, res) => {
        res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
        res.redirect('/login');
    },
};

module.exports = authController;