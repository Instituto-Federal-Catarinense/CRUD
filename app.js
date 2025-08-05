const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const testeRoutes = require('./routes/testeRoutes'); 
const pedidosRoutes = require('./routes/pedidosRoutes'); // Importando o roteador de pedidos
const sequelize = require('./config/db');

const app = express(); 
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/testes', testeRoutes);
app.use('/pedidos', pedidosRoutes); // Usando o roteador de pedidos

sequelize.sync(); // Sincroniza os models com o banco

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
