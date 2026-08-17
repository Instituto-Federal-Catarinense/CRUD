const INATIVIDADE_MINUTOS = 30;
const TEMPO_ABSOLUTO_MINUTOS = 120;

const INATIVIDADE_MS = INATIVIDADE_MINUTOS * 60 * 1000;
const TEMPO_ABSOLUTO_MS = TEMPO_ABSOLUTO_MINUTOS * 60 * 1000;

function sessionTimeout(req, res, next) {
    if (!req.session.usuario) {
        return next();
    }

    const agora = Date.now();

    if (!req.session.criadoEm) {
        req.session.criadoEm = agora;
    }

    if (!req.session.ultimaAtividade) {
        req.session.ultimaAtividade = agora;
    }

    const tempoAbsolutoExpirou = (agora - req.session.criadoEm) > TEMPO_ABSOLUTO_MS;
    const inatividadeExpirou = (agora - req.session.ultimaAtividade) > INATIVIDADE_MS;

    if (tempoAbsolutoExpirou || inatividadeExpirou) {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/users/login');
        });
        return;
    }

    req.session.ultimaAtividade = agora;
    next();
}

module.exports = sessionTimeout;
