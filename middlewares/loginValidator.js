/**
 * Middleware para validar credenciais de login
 * Verifica username e password contra o banco de dados
 */
const User = require('../models/userModel');

const loginValidator = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    User.findByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Username ou password inválidos' });
        }

        // Quando implementarmos sessão, armazenaremos o usuário aqui
        req.user = user;
        next();
    });
};

module.exports = loginValidator;
