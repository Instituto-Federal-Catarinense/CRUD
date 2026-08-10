const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

// Importação das rotas do CRUD (telas antigas)
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
const PORT = 666; 

// ==========================================
// CRIPTOGRAFIA
// ==========================================
const SENHA_HASH_PEDRO = bcrypt.hashSync('12345', 10);

// ==========================================
// CONFIGURAÇÃO DAS VIEWS E MIDDLEWARES
// ==========================================
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Middleware para passar mensagens (sucesso/erro) e o usuário logado para as views EJS
app.use((req, res, next) => {
    res.locals.msg = req.query.msg || null;
    res.locals.error = req.query.error || null;
    next();
});

// ==========================================
// GERENCIAMENTO DE SESSÃO
// ==========================================
app.use(session({
    secret: 'chave_secreta_super_segura_pedro_666',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 30 }
}));

// Disponibilizar a sessão em res.locals para os templates EJS renderizarem links diferentes
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

// ==========================================
// MIDDLEWARE DE PROTEÇÃO (AUTENTICAÇÃO)
// ==========================================
function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next(); 
    }
    // Se não estiver autenticado, joga de volta pra tela de login com erro
    return res.redirect('/login?error=' + encodeURIComponent('Faça login para acessar o sistema.'));
}

// ==========================================
// ROTAS PÚBLICAS
// ==========================================

app.get('/', (req, res) => {
    // Redireciona para o login ou para o sistema
    res.redirect('/login');
});

// Tela de Login (GET)
app.get('/login', (req, res) => {
    if (req.session.usuario) return res.redirect('/dashboard');
    res.render('login');
});

// Processamento do Login (POST)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.redirect('/login?error=' + encodeURIComponent('Preencha todos os campos.'));
    }

    if (username !== 'pedro') {
        return res.redirect('/login?error=' + encodeURIComponent('Credenciais inválidas.'));
    }

    const senhaValida = await bcrypt.compare(password, SENHA_HASH_PEDRO);
    if (!senhaValida) {
        return res.redirect('/login?error=' + encodeURIComponent('Credenciais inválidas.'));
    }

    req.session.usuario = { username: 'pedro' };
    res.redirect('/dashboard?msg=' + encodeURIComponent('Bem vindo de volta, Pedro!'));
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.redirect('/login?msg=' + encodeURIComponent('Você saiu do sistema.'));
    });
});

// ==========================================
// ROTAS PROTEGIDAS (AS TELAS DO CRUD)
// ==========================================
// Aplica o middleware "verificarAutenticacao" em TODAS as rotas abaixo
app.use('/dashboard', verificarAutenticacao, (req, res) => {
    res.render('index'); // A tela index principal do crud (Dashboard)
});
app.use('/users', verificarAutenticacao, userRoutes);
app.use('/posts', verificarAutenticacao, postRoutes);
app.use('/categorias', verificarAutenticacao, categoriaRoutes);

// ==========================================
// INICIALIZAÇÃO
// ==========================================
app.listen(PORT, () => {
    console.log(`Servidor seguro com TELAS rodando na porta ${PORT}`);
});
