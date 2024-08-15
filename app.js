const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const userRoutes = require('./routes/userRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const compraRoutes = require('./routes/compraRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use('/users', userRoutes);
app.use('/clientes', clienteRoutes);
app.use('/compras', compraRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/fornecedores', fornecedorRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
