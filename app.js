require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const cozinhaRoutes = require('./routes/cozinhaRoutes');
const entregaRoutes = require('./routes/entregaRoutes');

const {
    exigirLogin
} = require('./middlewares/authMiddleware');

const app = express();

const PORT = process.env.PORT || 3000;

app.locals.title = 'Cantina Federal';

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);

app.use(
    express.static(`${__dirname}/public`)
);

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(methodOverride('_method'));

app.use(
    session({
        name: 'cantina.sid',

        secret:
            process.env.SESSION_SECRET ||
            'cantina-federal-chave-desenvolvimento',

        resave: false,
        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure:
                process.env.NODE_ENV === 'production',

            maxAge: 8 * 60 * 60 * 1000
        }
    })
);

/*
 * Disponibiliza o usuário conectado
 * em todas as páginas EJS.
 */
app.use((req, res, next) => {
    res.locals.usuarioLogado =
        req.session.usuario || null;

    next();
});

/*
 * Rotas públicas.
 */
app.use('/auth', authRoutes);

/*
 * Rotas protegidas.
 */
app.use(
    '/',
    exigirLogin,
    indexRoutes
);

app.use(
    '/clientes',
    exigirLogin,
    clienteRoutes
);

app.use(
    '/produtos',
    exigirLogin,
    produtoRoutes
);

app.use(
    '/categorias',
    exigirLogin,
    categoriaRoutes
);

app.use(
    '/pedidos',
    exigirLogin,
    pedidoRoutes
);

app.use(
    '/cozinha',
    exigirLogin,
    cozinhaRoutes
);

app.use(
    '/entregas',
    exigirLogin,
    entregaRoutes
);

/*
 * Página não encontrada.
 */
app.use((req, res) => {
    res.status(404).send(
        'Página não encontrada.'
    );
});

app.listen(PORT, () => {
    console.log(
        `Cantina Federal rodando em http://localhost:${PORT}`
    );
});