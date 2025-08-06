const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const corRoutes = require('./routes/corRoutes');

// Importando a configuração do Sequelize
const db = require('./models'); // O Sequelize está configurado e exportado no index.js dentro da pasta models

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rotas
app.use('/', indexRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/cores', corRoutes);

// Testando a conexão com o banco de dados
db.sequelize.authenticate()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
