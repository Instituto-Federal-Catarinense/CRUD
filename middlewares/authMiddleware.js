const exigirLogin = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/auth/login');
    }

    return next();
};

const exigirPerfil = (...perfisPermitidos) => {
    return (req, res, next) => {
        const usuario =
            req.session.usuario;

        if (!usuario) {
            return res.redirect('/auth/login');
        }

        if (
            !perfisPermitidos.includes(
                usuario.perfil
            )
        ) {
            return res
                .status(403)
                .send(
                    'Você não possui permissão para acessar esta página.'
                );
        }

        return next();
    };
};

module.exports = {
    exigirLogin,
    exigirPerfil
};