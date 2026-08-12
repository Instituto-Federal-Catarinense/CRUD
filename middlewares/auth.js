const { getUsuarioFromToken } = require('./authMiddleware');

function isAuthenticated(req, res, next) {
    const usuario = getUsuarioFromToken(req);
    if (usuario) {
        req.usuario = usuario;
        return next();
    }
    return res.redirect('/users/login');
}

function authorizeRoles(...rolesPermitidos) {
    return (req, res, next) => {
        const usuario = getUsuarioFromToken(req);
        if (!usuario) {
            return res.redirect('/users/login');
        }
        if (!rolesPermitidos.includes(usuario.role)) {
            return res.status(403).send('Acesso negado: você não tem permissão para acessar esta página.');
        }
        req.usuario = usuario;
        next();
    };
}

module.exports = { isAuthenticated, authorizeRoles };