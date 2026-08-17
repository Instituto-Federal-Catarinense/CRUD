# Registro de Alterações - Sistema CRUD

## Auditoria Inicial

Auditoria completa do sistema de autenticação e controle de sessão, identificando 18 problemas de segurança classificados por severidade.

### Problemas Críticos Identificados

1. **Session secret hardcoded** - `"crud"` em vez de variável de ambiente
2. **`.env` não estava no `.gitignore`** - credenciais expostas ao repositório
3. **Hash da senha armazenado na sessão** - objeto `user` inteiro (incluindo `password`) trafegava no cookie
4. **Sem configuração de cookies seguros** - ausência de `httpOnly`, `secure`, `sameSite`, `maxAge`
5. **Senhas não hasheadas na atualização** - `updateUser` salvava senha em texto plano
6. **Sessão em memória (MemoryStore)** - perdida a cada reinício do servidor

### Problemas Altos Identificados

7. **Mensagens de erro enumeram usuários** - "Usuário não encontrado" / "Senha incorreta"
8. **Rotas duplicadas sem proteção** - produtos e categorias tinham rotas registradas antes das protegidas
9. **Sem middleware de autorização por papel** - campo `role` existia mas nunca era verificado
10. **Logout via GET** - vulnerável a CSRF

### Problemas Médios/Baixos

11. Navbar não verificava estado de login
12. Registro público sem controle
13. `loginModels.js` usava Sequelize mas o projeto usava mysql2 direto
14. `renderCreateForm` definido duas vezes
15. `bcrypt` importado duas vezes
16. Respostas de erro inconsistentes
17. Página de login sem layout EJS
18. Rota raiz não protegida

---

## Alterações Implementadas

### 1. Correções de Sessão e Cookies (`app.js`)

**Antes:**
```js
app.use(session({
    secret: "crud",
    resave: false,
    saveUninitialized: false
}));
```

**Depois:**
```js
app.use(session({
    secret: process.env.SESSION_SECRET || "crud",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000
    }
}));
```

### 2. `.gitignore` Atualizado

Adicionado:
```
.env
.env.local
.env.*.local
```

### 3. Senha Removida da Sessão (`app.js`)

**Antes:**
```js
req.session.usuario = user; // objeto inteiro com password
```

**Depois:**
```js
req.session.usuario = {
    id: user.id,
    username: user.username,
    role: user.role
};
```

### 4. Mensagens de Login Genéricas (`controllers/userController.js`)

**Antes:**
```js
return res.send("Usuário não encontrado");
return res.send("Senha incorreta");
```

**Depois:**
```js
return res.status(401).send("Credenciais inválidas");
```

### 5. Senha Hasheada na Atualização (`controllers/userController.js`)

**Antes:**
```js
password: req.body.password, // texto plano
```

**Depois:**
```js
password: await bcrypt.hash(req.body.password, 10),
```

### 6. Rotas Protegidas Corrigidas (`routes/produtoRoutes.js`, `routes/categoriaRoutes.js`)

Removidas rotas duplicadas não protegidas que precediam as protegidas. Antes, as primeiras rotas (sem `verificarLogin`) eram registradas primeiro e sempre coincidiam, tornando as rotas protegidas inúteis.

### 7. Middleware de Autorização por Papel (`middleware/auth.js`)

Adicionada função `verificarAdmin`:
```js
function verificarAdmin(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/users/login');
    }
    if (req.session.usuario.role !== 'admin') {
        return res.status(403).send('Acesso negado');
    }
    next();
}
```

### 8. Logout Alterado para POST (`routes/userRoutes.js`)

**Antes:** `router.get('/logout', ...)`
**Depois:** `router.post('/logout', ...)`

### 9. Navbar Condicional (`views/partials/navbar.ejs`)

- Visitante: vê apenas "Entrar"
- Usuário logado: vê Categorias, Produtos, nome e botão "Sair" (form POST)
- Admin: vê menu de Usuários

### 10. Usuários Protegidos por Admin (`routes/userRoutes.js`)

Todas as rotas de gestão de usuários agora usam `verificarLogin` + `verificarAdmin`.

### 11. Arquivo Removido

`models/loginModels.js` - arquivo morto com referência Sequelize incompatível.

---

## Implementação de Sessão com Timeout (`middleware/sessionTimeout.js`)

Criado middleware com dois controles de tempo:

- **Inatividade**: logout automático após 30 min sem requisição
- **Tempo absoluto**: logout automático após 2h independente de atividade

```js
const INATIVIDADE_MINUTOS = 30;
const TEMPO_ABSOLUTO_MINUTOS = 120;
```

Registrado em `app.js` após o middleware de sessão.

---

## Migração para JWT

### Dependências

- Removido: `express-session`
- Adicionado: `jsonwebtoken`, `cookie-parser`

### Arquivo: `config/jwt.js`

```js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRACAO = process.env.JWT_EXPIRACAO || '30m';

function gerarToken(usuario) {
    return jwt.sign(
        { id: usuario.id, username: usuario.username, role: usuario.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRACAO }
    );
}

function verificarToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { gerarToken, verificarToken };
```

### `.env` Atualizado

```env
JWT_SECRET=tcc123jwtSecret2024
JWT_EXPIRACAO=30m
```

### Fluxo de Autenticação

1. **Login**: bcrypt valida senha → `gerarToken()` cria JWT → cookie `token` httpOnly (30min)
2. **Request**: `app.js` decodifica JWT → `res.locals.usuario` disponível nas views
3. **Rotas protegidas**: `verificarLogin`/`verificarAdmin` leem cookie `token` e verificam com `jwt.verify()`
4. **Expiração**: token expira em 30min (configurável via `JWT_EXPIRACAO`)

### Cookie Seguro

```js
res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 30 * 60 * 1000
});
```

### Arquivo Removido

`middleware/sessionTimeout.js` - expiração agora controlada pelo campo `expiresIn` do JWT.

---

## Substituição de bcrypt por argon2

### Dependência

- Removido: `bcrypt`
- Adicionado: `argon2`

### Mudanças em `controllers/userController.js`

| Método | Antes | Depois |
|---|---|---|
| `createUser` | `bcrypt.hash(password, 10)` | `argon2.hash(password)` |
| `login` | `bcrypt.compare(password, hash, cb)` | `argon2.verify(hash, password)` |
| `register` | `bcrypt.hash(password, 10)` | `argon2.hash(password)` |
| `updateUser` | `bcrypt.hash(password, 10)` | `argon2.hash(password)` |

### Detalhe do Login

O `login` foi reescrito com `async/await` + `Promise` wrapper, pois `argon2.verify()` é promise-based:

```js
login: async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await new Promise((resolve, reject) => {
            User.findByUsername(username, (err, user) => {
                if (err) return reject(err);
                resolve(user);
            });
        });

        if (!user)
            return res.status(401).send("Credenciais inválidas");

        const same = await argon2.verify(user.password, password);

        if (!same)
            return res.status(401).send("Credenciais inválidas");

        const token = gerarToken(user);
        res.cookie('token', token, { /* config */ });
        res.redirect('/');
    } catch (err) {
        return res.status(500).send(err);
    }
}
```

### Nota Importante

Hashes bcrypt existentes no banco **não são compatíveis** com argon2. Usuários precisarão redefinir suas senhas ou será necessária uma migração de dados.

---

## Arquivos Modificados

| Arquivo | Ação |
|---|---|
| `app.js` | Removido express-session, adicionado cookie-parser + JWT |
| `.env` | Adicionado JWT_SECRET e JWT_EXPIRACAO |
| `.gitignore` | Adicionado .env |
| `config/jwt.js` | **Criado** - utilitário JWT |
| `middleware/auth.js` | Reescrito - verificação via JWT cookie |
| `middleware/sessionTimeout.js` | **Criado e depois removido** (substituído por JWT) |
| `controllers/userController.js` | Login JWT, argon2, logout clearCookie |
| `routes/userRoutes.js` | Logout POST, rotas admin |
| `routes/produtoRoutes.js` | Rotas duplicadas removidas |
| `routes/categoriaRoutes.js` | Rotas duplicadas removidas |
| `views/partials/navbar.ejs` | Condicional por login e role |
| `models/loginModels.js` | **Removido** |
| `package.json` | bcrypt → argon2, +jsonwebtoken, +cookie-parser |
