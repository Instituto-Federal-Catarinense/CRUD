const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }

    if (req.path.startsWith('/api/')) {
        return res.status(401).json({ message: 'Não autenticado.' });
    }

    return res.redirect('/auth/login');
};

module.exports = authMiddleware;
