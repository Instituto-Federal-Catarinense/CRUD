require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = {
    attachUser: (req, res, next) => {
        const token = req.cookies?.token;
        if (!token) {
            res.locals.user = null;
            req.user = null;
            return next();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.clearCookie('token');
                res.locals.user = null;
                req.user = null;
                return next();
            }

            if (!decoded?.id) {
                res.clearCookie('token');
                res.locals.user = null;
                req.user = null;
                return next();
            }

            User.findById(decoded.id, (findErr, user) => {
                if (findErr || !user) {
                    res.clearCookie('token');
                    res.locals.user = null;
                    req.user = null;
                    return next();
                }

                req.user = user;
                res.locals.user = user;
                next();
            });
        });
    },

    requireAuth: (req, res, next) => {
        if (req.user) {
            return next();
        }

        if (req.headers.accept?.includes('application/json')) {
            return res.status(401).json({ message: 'Não autorizado.' });
        }

        return res.redirect('/login');
    },
};

module.exports = authMiddleware;
