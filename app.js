require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const { isAuthenticated, isAdmin } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Sessão de login. Em produção, troque o MemoryStore padrão por um
// store persistente (ex.: connect-redis, connect-mysql) e defina
// SESSION_SECRET no .env com um valor forte e secreto.
app.use(session({
    secret: process.env.SESSION_SECRET || 'troque-este-segredo',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 horas
    },
}));

// Deixa o usuário logado (ou null) disponível em todas as views (ex.: navbar.pug)
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});

// Rotas públicas
app.use('/', indexRoutes);
app.use('/', authRoutes); // /login (GET/POST) e /logout

// Rotas protegidas — exigem login
// Gerenciamento de usuários é uma seção de controle restrita a administradores
app.use('/users', isAuthenticated, isAdmin, userRoutes);
app.use('/produtos', isAuthenticated, produtoRoutes);
app.use('/categorias', isAuthenticated, categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
