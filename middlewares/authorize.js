/**
 * Middleware de autorização
 * Verifica se o usuário tem a role necessária para acessar certos recursos
 * Deve ser usado após o middleware de autenticação
 */
const authorizeMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            return res.redirect('/login');
        }

        if (!allowedRoles.includes(req.session.user.role)) {
            return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
        }

        next();
    };
};

module.exports = authorizeMiddleware;
