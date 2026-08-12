const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const { checkAuth, getUsuarioFromToken } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Decodifica o JWT do cookie (se existir) e disponibiliza pra todas as views
app.use((req, res, next) => {
    const usuario = getUsuarioFromToken(req);
    req.usuario = usuario;
    res.locals.usuario = usuario;
    next();
});

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', checkAuth, produtoRoutes);
app.use('/categorias', checkAuth, categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});