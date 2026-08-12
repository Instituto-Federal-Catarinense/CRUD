require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const expressLayouts = require('express-ejs-layouts');
const { authenticate } = require('./middleware/authMiddleware');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    res.locals.currentUser = null;
    if (req.cookies.token) {
        try {
            res.locals.currentUser = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        } catch (err) {
            res.clearCookie('token');
        }
    }
    next();
});

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/users', authenticate, userRoutes);
app.use('/produtos', authenticate, produtoRoutes);
app.use('/categorias', authenticate, categoriaRoutes);

app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Página não encontrada',
        message: 'A página que você procura não existe.',
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('error', {
        title: 'Erro interno',
        message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
