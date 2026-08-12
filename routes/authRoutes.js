// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// credenciais fixas só para aprender o middleware (conforme seu professor autorizou)
const USUARIO_ADMIN = 'adminValentina';
const SENHA_ADMIN = '123456';

router.get('/login', (req, res) => {
  res.render('login', { aviso: req.query.aviso || null });
});

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === USUARIO_ADMIN && senha === SENHA_ADMIN) {
    req.session.usuarioLogado = usuario;
    req.session.ultimaAtividade = Date.now();
    return res.redirect('/');
  }

  res.render('login', { aviso: 'Usuário ou senha inválidos' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;