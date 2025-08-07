const express = require('express');
require('dotenv').config(); // Carregar .env no início
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

console.log('🚀 Starting CRUD application...');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

try {
    // Importar rotas
    const indexRoutes = require('./routes/indexRoutes');
    const userRoutes = require('./routes/userRoutes');
    const produtoRoutes = require('./routes/produtoRoutes');
    const categoriaRoutes = require('./routes/categoriaRoutes');
    const capivaraRoutes = require('./routes/capivaraRoutes');

    // Rotas
    app.use('/', indexRoutes);
    app.use('/users', userRoutes);
    app.use('/produtos', produtoRoutes);
    app.use('/categorias', categoriaRoutes);
    app.use('/capivara', capivaraRoutes);

    console.log('✅ Routes loaded successfully');

    // Configuração do banco de dados
    try {
        const sequelize = require('./config/database');

        // Importar modelos
        const User = require('./models/user');
        const Categoria = require('./models/Categoria');
        const Produto = require('./models/Produto');
        const Capivara = require('./models/Capivara');

        // Associações
        Produto.belongsTo(Categoria, {
            foreignKey: 'categoriaId',
            as: 'categoria'
        });

        Categoria.hasMany(Produto, {
            foreignKey: 'categoriaId',
            as: 'produtos'
        });

        console.log('✅ Models and associations loaded');

        // Conexão com banco e sincronização com alter: true
        sequelize.authenticate()
            .then(() => {
                console.log('✅ Database connection established');
                return sequelize.sync({ alter: true }); // <-- sincroniza ajustando tabela
            })
            .then(() => {
                console.log('✅ Database synchronized with { alter: true }');
            })
            .catch(err => {
                console.log('⚠️  Database connection failed:', err.message);
                console.log('🔄 Application will continue without database');
            });

    } catch (dbError) {
        console.log('⚠️  Database setup failed:', dbError.message);
        console.log('🔄 Application will continue without database');
    }

} catch (routeError) {
    console.error('❌ Error loading routes:', routeError.message);

    // Rota de fallback para erro de carregamento
    app.get('*', (req, res) => {
        res.send(`
            <h1>CRUD Application - Setup Required</h1>
            <p>There seems to be an issue with the application setup.</p>
            <p>Error: ${routeError.message}</p>
            <p>Please check your configuration.</p>
        `);
    });
}

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🎉 Server started successfully!');
    console.log(`🌐 Access the application at: http://localhost:${PORT}`);
    console.log('📝 Make sure to configure your .env file with database credentials');
});

// Tratamento de erros não capturados
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
});
