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

const auth = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(session({
    secret: 'crud-secret',
    resave: false,
    saveUninitialized: false
}));

// Disponibiliza o usuário logado para as páginas EJS
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Rotas públicas
app.use('/', indexRoutes);
app.use('/', authRoutes);

// Rotas protegidas por login
app.use('/users', auth, userRoutes);
app.use('/produtos', auth, produtoRoutes);
app.use('/categorias', auth, categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});