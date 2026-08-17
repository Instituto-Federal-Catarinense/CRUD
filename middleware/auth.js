function verificarLogin(req, res, next) {
    if (req.session.usuario) {
        return next();
    }
    res.redirect('/users/login');
}

function verificarAdmin(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/users/login');
    }
    if (req.session.usuario.role !== 'admin') {
        return res.status(403).send('Acesso negado');
    }
    next();
}

module.exports = { verificarLogin, verificarAdmin };
