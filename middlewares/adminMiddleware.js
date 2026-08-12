const adminMiddleware = (req, res, next) => {

    if (req.session.usuario && req.session.usuario.role === 'admin') {
        next();
    } else {
        res.status(403).send('Acesso negado. Apenas administradores podem acessar esta página.');
    }

};

module.exports = adminMiddleware;