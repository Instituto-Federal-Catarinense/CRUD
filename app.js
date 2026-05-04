const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
const PORT = process.env.PORT || 5050;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
