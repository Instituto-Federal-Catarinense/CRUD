const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');
const { ensureGuest } = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.locals.isAuthenticated = false;
app.locals.currentUser = null;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(session({
    secret: process.env.SESSION_SECRET || 'crud-session-secret',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    res.locals.isAuthenticated = Boolean(req.session.user);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/login', ensureGuest, authController.renderLoginForm);
app.post('/login', ensureGuest, authController.login);
app.post('/logout', authController.logout);

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
