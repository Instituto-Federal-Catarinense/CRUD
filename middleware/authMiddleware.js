const authMiddleware = {
    isAuthenticated: (req, res, next) => {
        if (req.session && req.session.user) {
            return next();
        }

        return res.redirect('/login');
    },

    isAdmin: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === 'admin') {
            return next();
        }

        return res.status(403).render('error', {
            message: 'Você não tem permissão para acessar esta área.',
            error: { status: 403 }
        });
    }
};

module.exports = authMiddleware;
