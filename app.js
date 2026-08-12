const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const authRoutes = require('./routes/authRoutes');

const verificarLogin = require('./middlewares/authMiddleware');
const isAdmin = require('./middlewares/isAdmin');

const app = express();

const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));


// Configuração da sessão
app.use(session({
    secret: 'chave-secreta-crud',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

// Disponibiliza a sessão para as páginas EJS
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


// Rotas de autenticação (públicas)
app.use('/', authRoutes);


// Página inicial (pública)
app.use('/', indexRoutes);


// Rotas protegidas (somente ADMIN)
app.use('/users', verificarLogin, isAdmin, userRoutes);

app.use('/produtos', verificarLogin, isAdmin, produtoRoutes);

app.use('/categorias', verificarLogin, isAdmin, categoriaRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});