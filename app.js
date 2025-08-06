const express = require('express');
const app = express();
const { sequelize } = require('./models');

// Rotas
const usuarioRoutes = require('./routes/usuario');
const categoriaRoutes = require('./routes/categoria');
const produtoRoutes = require('./routes/produto');

app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/produtos', produtoRoutes);

// Sincronizar banco e rodar servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
});
