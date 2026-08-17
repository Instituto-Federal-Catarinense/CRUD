const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const sessionTimeout = require('./middleware/sessionTimeout');

const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET || "crud",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000
    }
}));

app.use(sessionTimeout);

app.use((req,res,next)=>{
    if (req.session.usuario) {
        res.locals.usuario = {
            id: req.session.usuario.id,
            username: req.session.usuario.username,
            role: req.session.usuario.role
        };
    } else {
        res.locals.usuario = null;
    }
    next();
});

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);

app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});
