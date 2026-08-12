const authMiddleware = (req, res, next) => {

    if (req.session.logado) {
        next();
    } else {
        res.redirect('/login');
    }

};

module.exports = authMiddleware;