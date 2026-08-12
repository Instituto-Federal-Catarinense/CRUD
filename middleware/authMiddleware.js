const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }

    return res.redirect('/login');
};

const ensureGuest = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect('/');
    }

    return next();
};

module.exports = {
    ensureAuthenticated,
    ensureGuest,
    isAuthenticated: ensureAuthenticated,
};

