const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const userRoutes = require('./routes/userRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes'); // Adicionado para pagamentos
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/users', userRoutes);
app.use('/pagamentos', pagamentoRoutes); // Adicionado para pagamentos

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
