// Garante que a rota só seja acessada por um usuário autenticado.
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }

    return res.redirect('/login');
};

// Permite o acesso apenas para perfis específicos, como admin ou user.
const authorize = (roles = []) => (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }

    if (roles.length > 0 && !roles.includes(req.session.user.role)) {
        return res.status(403).send('Acesso negado');
    }

    return next();
};

module.exports = {
    isAuthenticated,
    authorize,
};
