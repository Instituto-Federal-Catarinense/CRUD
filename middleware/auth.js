// middleware/auth.js
const User = require('../models/User');

// Verifica se o usuário está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    // Redireciona para login se não estiver autenticado
    return res.redirect('/auth/login');
};

// Verifica se o usuário NÃO está autenticado (para páginas de login)
const isNotAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return next();
    }
    // Redireciona para dashboard se já estiver logado
    return res.redirect('/dashboard');
};

// Verifica se é admin (para rotas administrativas)
const isAdmin = (req, res, next) => {
    if (req.session && req.session.userId && req.session.role === 'admin') {
        return next();
    }
    return res.status(403).send('Acesso negado. Permissão de administrador necessária.');
};

// Middleware para disponibilizar dados do usuário nas views
const setUserLocals = (req, res, next) => {
    res.locals.user = null;
    if (req.session && req.session.userId) {
        User.findById(req.session.userId, (err, user) => {
            if (!err && user) {
                res.locals.user = {
                    id: user.id,
                    username: user.username,
                    role: user.role
                };
            }
            next();
        });
    } else {
        next();
    }
};

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    isAdmin,
    setUserLocals
};