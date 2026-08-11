const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const authController = require('./controllers/authController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(sessionMiddleware);

app.get('/login', authController.renderLoginForm);
app.post('/login', authController.login);
app.get('/register', (req, res) => res.render('auth/register'));
app.post('/register', authController.register);
app.get('/logout', authController.logout);

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
