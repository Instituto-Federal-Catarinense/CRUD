function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }

    // Para requisições que esperam JSON, devolve 401.
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(401).json({ error: 'Não autenticado.' });
    }

    return res.redirect('/auth/login');
}

function requireRole(role) {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            return res.redirect('/auth/login');
        }

        if (req.session.user.role !== role) {
            return res.status(403).send('Acesso negado.');
        }

        next();
    };
}

module.exports = { requireAuth, requireRole };
