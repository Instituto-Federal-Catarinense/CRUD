const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const loginRoutes = require('./routes/loginRoutes');

const verificarLogin = require('./middleware/authMiddleware');

const app = express();

const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(expressLayouts);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração da sessão
app.use(session({
    secret: 'chave-secreta-do-sistema',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hora
    }
}));

// ==========================================
// ROTA DE LOGIN
// ==========================================
// Essa rota fica pública.
// O usuário precisa conseguir acessar o login
// mesmo sem estar autenticado.
app.use('/login', loginRoutes);


// ==========================================
// ROTAS PROTEGIDAS
// ==========================================
// Todas essas rotas precisam de login.

app.use('/', verificarLogin, indexRoutes);

app.use('/users', verificarLogin, userRoutes);

app.use('/produtos', verificarLogin, produtoRoutes);

app.use('/categorias', verificarLogin, categoriaRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});