// Middleware responsável por verificar se o usuário está autenticado.
// Se a sessão existir e contiver um usuário, a requisição segue.
// Caso contrário, o usuário é redirecionado para a tela de login.
const authMiddleware = {
    isAuthenticated: (req, res, next) => {
        if (req.session && req.session.user) {
            return next();
        }

        return res.redirect('/login');
    },

    // Middleware específico para impedir que usuários comuns acessem áreas de administrador.
    isAdmin: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === 'admin') {
            return next();
        }

        return res.status(403).send('Acesso negado. Somente administradores podem entrar aqui.');
    },

    // Middleware específico para impedir que administradores acessem áreas exclusivas de usuário.
    isUser: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === 'user') {
            return next();
        }

        return res.status(403).send('Acesso negado. Somente usuários comuns podem entrar aqui.');
    },
};

module.exports = authMiddleware;