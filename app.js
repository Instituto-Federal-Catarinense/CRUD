const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
require('dotenv').config();

const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated, setUserLocals } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

// Definir layout padrão
app.set('layout', 'layout');

// Middlewares básicos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração da sessão
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 30 * 60 * 1000 // 30 minutos
    }
}));

// Middleware para disponibilizar dados do usuário nas views
app.use(setUserLocals);

// Rotas públicas (sem autenticação)
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// Rotas protegidas (com autenticação)
app.use('/users', isAuthenticated, userRoutes);
app.use('/produtos', isAuthenticated, produtoRoutes);
app.use('/categorias', isAuthenticated, categoriaRoutes);

// CORRIGIDO: Rota para página inicial
app.get('/', (req, res) => {
    if (req.session && req.session.userId) {
        res.redirect('/auth/dashboard');
    } else {
        res.redirect('/auth/login');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});