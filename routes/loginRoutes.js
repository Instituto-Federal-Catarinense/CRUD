const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();

const MAX_TENTATIVAS = 5;
const JANELA_MS = 15 * 60 * 1000;
const tentativas = new Map();

function limiteAtingido(ip) {
  const agora = Date.now();
  const registro = tentativas.get(ip);
  if (!registro || agora - registro.inicio > JANELA_MS) {
    tentativas.set(ip, { inicio: agora, contador: 0 });
    return false;
  }
  return registro.contador >= MAX_TENTATIVAS;
}

function registrarFalha(ip) {
  const agora = Date.now();
  const registro = tentativas.get(ip);
  if (registro && agora - registro.inicio <= JANELA_MS) {
    registro.contador += 1;
  } else {
    tentativas.set(ip, { inicio: agora, contador: 1 });
  }

  if (tentativas.size > 1000) {
    for (const [chave, valor] of tentativas) {
      if (agora - valor.inicio > JANELA_MS) {
        tentativas.delete(chave);
      }
    }
  }
}

async function autenticar(user, password) {
  if (!user.password) {
    return { valido: false, migrar: false };
  }
  if (user.password.startsWith("$2")) {
    const ok = await bcrypt.compare(password, user.password);
    return { valido: ok, migrar: false };
  }
  const ok = user.password === password;
  return { valido: ok, migrar: ok };
}

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  const error = req.session.flash ? req.session.flash.error : null;
  delete req.session.flash;
  res.render("login", { layout: false, error });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;

  if (limiteAtingido(ip)) {
    req.session.flash = { error: "Muitas tentativas de login. Tente novamente em alguns minutos." };
    return res.redirect("/login");
  }

  if (!username || !password) {
    req.session.flash = { error: "Informe usuário e senha." };
    return res.redirect("/login");
  }

  User.findByUsername(username, async (err, user) => {
    if (err) {
      console.error("Erro no login:", err);
      req.session.flash = { error: "Erro interno. Tente novamente." };
      return res.redirect("/login");
    }

    const resultado = user ? await autenticar(user, password) : { valido: false, migrar: false };

    if (!resultado.valido) {
      registrarFalha(ip);
      req.session.flash = { error: "Usuário ou senha inválidos." };
      return res.redirect("/login");
    }

    if (resultado.migrar) {
      const hash = bcrypt.hashSync(password, 10);
      User.updatePassword(user.id, hash, (updErr) => {
        if (updErr) console.error("Falha ao migrar senha:", updErr);
      });
    }

    req.session.regenerate((regErr) => {
      if (regErr) console.error("Falha ao regenerar sessão:", regErr);
      req.session.user = { id: user.id, username: user.username, role: user.role };
      tentativas.delete(ip);
      res.redirect("/");
    });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
