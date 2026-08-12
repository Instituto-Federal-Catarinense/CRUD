const express = require("express");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(session({
  secret: process.env.SESSION_SECRET || "troque-este-segredo",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 8
  }
}));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// usuário logado disponível nas views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// CSRF
app.use(require("./middleware/csrfMiddleware"));

// rotas
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/userRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");

app.use(loginRoutes);
app.use("/users", userRoutes);
app.use("/produtos", produtoRoutes);
app.use("/categorias", categoriaRoutes);

// página inicial
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
