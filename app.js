const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

// Rotas existentes
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

// ✅ Nova rota de vendas
const vendaRoutes = require('./routes/vendaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Uso das rotas
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);

// ✅ Uso das rotas de vendas
app.use('/vendas', vendaRoutes);

// Adicionando configuração global do Sequelize
const { categoria, Produto, User, Venda } = require('./models');

// Rota de exemplo de teste para ver se o Sequelize está funcionando corretamente
app.get('/test', async (req, res) => {
    try {
        // Teste para garantir que o Sequelize está funcionando e a comunicação com o banco está ativa
        const categorias = await Categoria.findAll();
        res.json(categorias); // Retorna as categorias para teste
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar categorias no banco de dados.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
