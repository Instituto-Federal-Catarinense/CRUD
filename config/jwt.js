const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRACAO = process.env.JWT_EXPIRACAO || '30m';

function gerarToken(usuario) {
    return jwt.sign(
        { id: usuario.id, username: usuario.username, role: usuario.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRACAO }
    );
}

function verificarToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { gerarToken, verificarToken };
