const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const userRoutes = require('./routes/userRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const quizRoutes = require('./routes/quizRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/users', userRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/quiz', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
