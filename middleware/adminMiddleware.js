const adminMiddleware = (req, res, next) => {

    // Verifica se está logado
    if (!req.session.user) {
        return res.redirect('/login');
    }

    // Verifica se é administrador
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Acesso negado. Apenas administradores podem acessar esta página.');
    }

    next();
};

module.exports = adminMiddleware;