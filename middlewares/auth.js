const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticação com JWT
 * Verifica se o usuário tem um token válido ou sessão
 */
const authMiddleware = (req, res, next) => {
    const token = req.session.user?.token || req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta_jwt');
            req.user = decoded;
            return next();
        } catch (err) {
            return res.redirect('/login');
        }
    }

    if (req.session?.user?.id) {
        req.user = req.session.user;
        return next();
    }

    res.redirect('/login');
};

module.exports = authMiddleware;
