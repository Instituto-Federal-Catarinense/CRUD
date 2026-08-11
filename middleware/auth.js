// Middleware responsável por proteger rotas que precisam de login ativo.
module.exports = {
    isAuthenticated: (req, res, next) => {
        // Verifica se existe uma sessão válida com usuário logado.
        if (req.session && req.session.user) {
            return next();
        }

        // Se não houver sessão, redireciona para a tela de login.
        return res.redirect('/login');
    },

    // Middleware opcional para restringir o acesso a funções administrativas.
    isAdmin: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === 'admin') {
            return next();
        }

        return res.status(403).send('Acesso negado. Você não tem permissão para isso.');
    }
};
