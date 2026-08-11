require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'troque-esta-chave-em-producao',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 8 // 8 horas
    }
}));

// Disponibiliza o usuário logado em todas as views.
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});

// Rotas públicas
app.use('/auth', authRoutes);
app.use('/', indexRoutes);

// Rotas protegidas pelo middleware de sessão
app.use('/users', requireAuth, userRoutes);
app.use('/produtos', requireAuth, produtoRoutes);
app.use('/categorias', requireAuth, categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
