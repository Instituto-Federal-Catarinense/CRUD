// middlewares/authMiddleware.js
const TEMPO_LIMITE_INATIVIDADE = 10 * 60 * 1000; // 10 minutos em ms

function requireLogin(req, res, next) {
  // não está logado
  if (!req.session.usuarioLogado) {
    return res.redirect('/login?aviso=Você precisa estar logado para acessar essa função');
  }

  // verifica inatividade
  const agora = Date.now();
  if (req.session.ultimaAtividade && (agora - req.session.ultimaAtividade > TEMPO_LIMITE_INATIVIDADE)) {
    return req.session.destroy(() => {
      res.redirect('/login?aviso=Sua sessão expirou por inatividade. Faça login novamente');
    });
  }

  // renova o "cronômetro" a cada ação protegida
  req.session.ultimaAtividade = agora;
  next();
}

module.exports = { requireLogin };