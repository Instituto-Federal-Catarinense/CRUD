function verificarLogin(req,res,next){

    if(req.session.usuario){
        return next();
    }

    res.redirect("/users/login");

}

module.exports = verificarLogin;