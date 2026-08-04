const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    req.session.error = 'Você precisa estar logado para acessar esta página.';
    res.redirect('/login');
};

const exposeUserToViews = (req, res, next) => {
    res.locals.user = req.session ? req.session.user : null;
    res.locals.error = req.session ? req.session.error : null;
    res.locals.success = req.session ? req.session.success : null;
    if (req.session) {
        delete req.session.error;
        delete req.session.success;
    }
    next();
};

module.exports = {
    isAuthenticated,
    exposeUserToViews,
};
