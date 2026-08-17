const { verificarToken } = require('../config/jwt');

function verificarLogin(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/users/login');
    }

    try {
        const decoded = verificarToken(token);
        req.usuario = decoded;
        return next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/users/login');
    }
}

function verificarAdmin(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/users/login');
    }

    try {
        const decoded = verificarToken(token);
        req.usuario = decoded;

        if (decoded.role !== 'admin') {
            return res.status(403).send('Acesso negado');
        }

        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/users/login');
    }
}

module.exports = { verificarLogin, verificarAdmin };
