const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const { isAuthenticated } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const sessions = {};
const SESSION_COOKIE_NAME = 'crud_session';

// Converte o cabeçalho de cookies em um objeto para facilitar a leitura da sessão.
function parseCookies(cookieHeader = '') {
    return cookieHeader.split(';').reduce((acc, item) => {
        const [key, ...valueParts] = item.trim().split('=');
        if (key) {
            acc[key] = valueParts.join('=');
        }
        return acc;
    }, {});
}

// Gera um identificador único para cada sessão ativa do usuário.
function generateSessionId() {
    return crypto.randomBytes(16).toString('hex');
}

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// Middleware global responsável por recuperar a sessão do usuário a partir do cookie.
app.use((req, res, next) => {
    const cookies = parseCookies(req.headers.cookie || '');
    const sessionId = cookies[SESSION_COOKIE_NAME];

    if (sessionId && sessions[sessionId]) {
        req.session = sessions[sessionId];
        req.sessionId = sessionId;
    } else {
        req.session = {};
        req.sessionId = generateSessionId();
    }

    // Salva a sessão atual no armazenamento em memória e envia o cookie ao navegador.
    req.saveSession = () => {
        sessions[req.sessionId] = req.session;
        res.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=${req.sessionId}; Path=/; HttpOnly`);
    };

    // Remove a sessão do armazenamento e invalida o cookie de autenticação.
    req.clearSession = () => {
        delete sessions[req.sessionId];
        res.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly`);
    };

    res.locals.user = req.session.user || null;
    next();
});

app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/users', isAuthenticated, userRoutes);
app.use('/produtos', isAuthenticated, produtoRoutes);
app.use('/categorias', isAuthenticated, categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
