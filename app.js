const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middleware/auth');
const User = require('./models/userModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração da sessão para manter o usuário logado entre requisições.
app.use(session({
    secret: 'crud-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Torna a sessão disponível para as views EJS.
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/users', isAuthenticated, userRoutes);
app.use('/produtos', isAuthenticated, produtoRoutes);
app.use('/categorias', isAuthenticated, categoriaRoutes);

// Cria um usuário inicial admin caso ainda não exista nenhum usuário no banco.
User.ensureDefaultAdmin((err, created) => {
    if (err) {
        console.error('Erro ao criar usuário padrão:', err);
        return;
    }

    if (created) {
        console.log('Usuário padrão criado: admin / admin');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
