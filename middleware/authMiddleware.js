const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/auth/login');
    }
};

const authorizeRole = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).render('error', {
            title: 'Acesso negado',
            message: 'Você não tem permissão para acessar este recurso.',
        });
    }
    next();
};

const isAdmin = authorizeRole('admin');

module.exports = { authenticate, authorizeRole, isAdmin };
