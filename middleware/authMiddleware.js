const jwt = require('jsonwebtoken');

const authMiddleware = {
    // Middleware global para extrair o usuário do token (se existir) e disponibilizar em res.locals.user
    authenticateToken: (req, res, next) => {
        const token = req.cookies && req.cookies.token;
        
        if (!token) {
            res.locals.user = null;
            req.user = null;
            return next();
        }

        const secret = process.env.JWT_SECRET || 'crud_jwt_secret_key_2026_super_secure';

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.locals.user = null;
                req.user = null;
            } else {
                res.locals.user = decoded;
                req.user = decoded;
            }
            next();
        });
    },

    // Exige que o usuário esteja autenticado
    requireAuth: (req, res, next) => {
        if (!req.user) {
            return res.redirect('/auth/login?error=' + encodeURIComponent('Acesso negado. Faça login para continuar.'));
        }
        next();
    },

    // Exige que o usuário seja Administrador
    requireAdmin: (req, res, next) => {
        if (!req.user) {
            return res.redirect('/auth/login?error=' + encodeURIComponent('Acesso negado. Faça login para continuar.'));
        }
        if (req.user.role !== 'admin') {
            return res.status(403).render('error', { 
                message: 'Acesso restrito: apenas administradores possuem permissão para esta funcionalidade.' 
            });
        }
        next();
    }
};

module.exports = authMiddleware;
