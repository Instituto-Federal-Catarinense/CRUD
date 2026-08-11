const jwt = require('jsonwebtoken');

const extractUser = (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        res.locals.currentUser = null;
        req.user = null;
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
        if (err) {
            res.locals.currentUser = null;
            req.user = null;
        } else {
            res.locals.currentUser = decoded;
            req.user = decoded;
        }
        next();
    });
};

const ensureAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};

const ensureAdmin = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (req.user.role !== 'admin') {
        return res.status(403).send('Acesso Negado: Apenas administradores têm permissão para acessar esta área.');
    }
    next();
};

module.exports = {
    extractUser,
    ensureAuthenticated,
    ensureAdmin
};
