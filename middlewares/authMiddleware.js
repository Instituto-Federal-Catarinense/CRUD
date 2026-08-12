const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'troque_essa_chave_em_producao';

function getUsuarioFromToken(req) {
    const token = req.cookies.token;
    if (!token) return null;

    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null; // token inválido ou expirado
    }
}

function checkAuth(req, res, next) {
    const usuario = getUsuarioFromToken(req);
    if (usuario) {
        req.usuario = usuario;
        return next();
    }
    return res.redirect('/users/login');
}

module.exports = { checkAuth, getUsuarioFromToken, JWT_SECRET };