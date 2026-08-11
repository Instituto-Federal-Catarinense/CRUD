const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const authMiddleware = require('./middleware/auth') //coisa nova aqi, nao esquece :(

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({ // coisa nova 
    secret: "crud",
    resave: false,
    saveUninitialized: false
})); // fechamento(?) da coisa nova

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: 'crud',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 15 * 1000
        }
    })
); //mais coisa nova

// Rota protegida (coisa nova)
app.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard', {
        user: req.session.user
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao fazer logout');
        }

        res.clearCookie('connect.sid');
        res.redirect('/users/login');
    });
}); //coia nova tbm


app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
