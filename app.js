const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const indexRoutes = require('./routes/indexRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

// Middlewares de autenticação e autorização
const authMiddleware = require('./middlewares/auth');
const authorizeMiddleware = require('./middlewares/authorize');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

// Configurar sessão (será trabalhado no próximo prompt)
app.use(session({
    secret: 'sua_chave_secreta_aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // colocar true se usar HTTPS
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.locals.currentUser = req.session ? req.session.user : null;
    next();
});

// Rotas públicas (sem autenticação necessária)
app.use('/', indexRoutes);
app.use('/', loginRoutes);

// Rotas protegidas (requer autenticação)
app.use('/users', authMiddleware, authorizeMiddleware(['admin']), userRoutes);
app.use('/produtos', authMiddleware, produtoRoutes);
app.use('/categorias', authMiddleware, categoriaRoutes);

// Error handler global para capturar erros
app.use((err, req, res, next) => {
    console.error('Erro na aplicação:', err);
    res.status(500).render('error', { 
        title: 'Erro',
        message: 'Erro ao processar a requisição',
        error: err.message 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
