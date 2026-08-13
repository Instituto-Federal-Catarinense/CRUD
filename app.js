const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/userModel');

const app = express();
const PORT = process.env.PORT || 3000;
@@ -18,11 +21,67 @@
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração da sessão para controlar o login do usuário.
app.use(session({
    secret: 'crud-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));

// Página de login.
app.get('/login', (req, res) => {
    res.render('login');
});

// Processamento do login.
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
        if (err || !user) {
            return res.send('Usuário não encontrado');
        }

        // Simples validação de senha para este exemplo.
        if (password === user.password) {
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            return res.redirect('/');
        }

        return res.send('Senha incorreta');
    });
});

// Logout do sistema.
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Middleware de autenticação aplicado nas rotas principais.
app.use(authMiddleware.isAuthenticated);

// Rota exclusiva para administradores.
app.get('/admin', authMiddleware.isAdmin, (req, res) => {
    res.render('area-admin', { user: req.session.user });
});

// Rota exclusiva para usuários comuns.
app.get('/area-usuario', authMiddleware.isUser, (req, res) => {
    res.render('area-user', { user: req.session.user });
});

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});