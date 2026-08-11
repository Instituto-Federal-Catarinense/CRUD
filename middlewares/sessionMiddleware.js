const crypto = require('crypto');

const sessions = new Map();

const sessionMiddleware = (req, res, next) => {
    const cookieHeader = req.headers.cookie || '';
    const cookies = Object.fromEntries(
        cookieHeader
            .split(';')
            .map((item) => item.trim())
            .filter(Boolean)
            .map((item) => {
                const [key, ...valueParts] = item.split('=');
                return [key, valueParts.join('=')];
            })
    );

    const sessionId = cookies.sid || crypto.randomUUID();

    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, {
            id: sessionId,
            logado: false,
            user: null,
            flash: null,
        });
    }

    req.session = sessions.get(sessionId);
    res.locals.session = req.session;
    res.locals.flash = req.session.flash;

    req.flash = (type, message) => {
        req.session.flash = { type, message };
    };

    res.clearFlash = () => {
        req.session.flash = null;
    };

    res.setHeader('Set-Cookie', [`sid=${sessionId}; HttpOnly; Path=/`]);
    next();
};

module.exports = sessionMiddleware;
