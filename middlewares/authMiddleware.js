const authMiddleware = (req, res, next) => {
    if (req.session && req.session.logado) {
        return next();
    }

    req.flash('danger', 'Você precisa estar autenticado para acessar esta página.');
    return res.redirect('/login');
};

const roleMiddleware = (allowedRoles = []) => (req, res, next) => {
    if (!req.session || !req.session.logado) {
        req.flash('danger', 'Você precisa estar autenticado para acessar esta página.');
        return res.redirect('/login');
    }

    if (allowedRoles.length && !allowedRoles.includes(req.session.user?.role)) {
        req.flash('danger', 'Você não tem permissão para acessar esta página.');
        return res.redirect('/');
    }

    return next();
};

module.exports = authMiddleware;
module.exports.roleMiddleware = roleMiddleware;