const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const brinquedoRoutes = require('./routes/brinquedoRoutes');
const sequelize = require('./config/sequelize');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/brinquedos', brinquedoRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
sequelize.authenticate()
  .then(() => console.log('Conectado ao banco via Sequelize!'))
  .catch(err => console.error('Erro conexão Sequelize:', err));