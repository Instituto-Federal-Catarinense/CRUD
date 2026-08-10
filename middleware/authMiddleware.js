// Middleware responsável por proteger rotas que exigem login e/ou permissão de admin.

// Garante que exista um usuário logado na sessão.
// Se não houver, guarda a URL que o usuário tentou acessar e manda para o login.
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }

    req.session.returnTo = req.originalUrl;
    return res.redirect('/login');
};

// Garante que o usuário logado tenha a role "admin".
// Deve ser usado sempre DEPOIS de isAuthenticated.
const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }

    return res.status(403).render('errors/403', {
        titulo: 'Acesso negado',
    });
};

module.exports = { isAuthenticated, isAdmin };
