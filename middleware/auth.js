function verificarLogin(req,res,next){

    if(req.session.usuario){
        return next();
    }

    res.redirect("/users/login");

}

// middleware/auth.js

function authMiddleware(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    // 15 segundos de inatividade
    const agora = Date.now();
    const ultimaAtividade = req.session.lastActivity || agora;

    if (agora - ultimaAtividade > 15 * 1000) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }

            return res.redirect('/login?expired=true');
        });

        return;
    }

    // Atualiza a última atividade
    req.session.lastActivity = agora;

    next();
}

module.exports = authMiddleware;

module.exports = verificarLogin;