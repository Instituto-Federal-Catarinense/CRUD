const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'change_this_secret';

function getTokenFromHeaderOrCookie(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }
    return req.cookies && req.cookies.token;
}

const authMiddleware = {
    setCurrentUser: (req, res, next) => {
        const token = getTokenFromHeaderOrCookie(req);
        if (!token) {
            res.locals.currentUser = null;
            return next();
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.clearCookie('token');
                res.locals.currentUser = null;
                return next();
            }

            req.user = decoded;
            res.locals.currentUser = decoded;
            next();
        });
    },

    requireAuth: (req, res, next) => {
        const token = getTokenFromHeaderOrCookie(req);
        if (!token) {
            return res.redirect('/auth/login');
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.clearCookie('token');
                return res.redirect('/auth/login');
            }

            req.user = decoded;
            res.locals.currentUser = decoded;
            next();
        });
    },
};

module.exports = authMiddleware;
