const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const { isAuthenticated, exposeUserToViews } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração do express-session para controle de sessão
app.use(session({
    secret: process.env.SESSION_SECRET || 'crud_session_secret_key_123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 } // Sessão expira em 2 horas
}));

// Disponibiliza o usuário da sessão para todas as views EJS
app.use(exposeUserToViews);

// Rotas públicas (autenticação e home)
app.use('/', authRoutes);
app.use('/', indexRoutes);

// Rotas protegidas por middleware de autenticação
app.use('/users', isAuthenticated, userRoutes);
app.use('/produtos', isAuthenticated, produtoRoutes);
app.use('/categorias', isAuthenticated, categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
