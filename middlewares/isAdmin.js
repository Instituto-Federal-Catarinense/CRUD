function isAdmin(req, res, next) {

    if (req.session && req.session.role === 'admin') {
        return next();
    }

    return res.status(403).send(
        'Acesso negado. Apenas administradores podem acessar esta área.'
    );
}

module.exports = isAdmin;