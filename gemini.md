# Rules and Project Guidelines - CRUD Node.js / Express / MySQL

Este documento define as regras, padrões arquiteturais e diretrizes de desenvolvimento para o projeto **CRUD**. Todos os agentes, desenvolvedores e assistentes de IA (como Gemini) devem seguir rigorosamente este guia ao ler, modificar ou adicionar novos recursos à aplicação.

---

## 1. Visão Geral do Projeto

O **CRUD** é uma aplicação web desenvolvida em **Node.js**, **Express**, **MySQL** e **EJS** para gerenciamento de entidades (Usuários, Categorias, Produtos, Vendas). 

A aplicação adota o padrão de arquitetura **MVC (Model-View-Controller)** com renderização no lado do servidor (SSR) utilizando EJS layouts e estilização via Bootstrap.

---

## 2. Tecnologias e Dependências Principais

* **Runtime:** Node.js (CommonJS - `require` / `module.exports`)
* **Framework Web:** Express.js (`^4.19.2`)
* **Banco de Dados:** MySQL 8+ (Driver `mysql2`)
* **Template Engine:** EJS (`ejs`) + `express-ejs-layouts`
* **Form Middlewares:** `body-parser` (parsing de JSON e URL-encoded), `method-override` (suporte a verbos HTTP `PUT` e `DELETE` em formulários HTML via `?_method=...`)
* **Variáveis de Ambiente:** `dotenv`
* **Live Reload (Dev):** `nodemon`

---

## 3. Estrutura de Diretórios

```text
CRUD/
├── config/
│   └── db.js                 # Conexão e configuração do MySQL (usando dotenv)
├── controllers/              # Regra de negócio, controle de fluxo e renderização de views
│   ├── categoriaController.js
│   ├── produtoController.js
│   ├── userController.js
│   └── vendaController.js
├── models/                   # Queries SQL brutas e acesso ao banco de dados (padrão callback)
│   ├── categoriaModel.js
│   ├── produtoModel.js
│   └── userModel.js
├── routes/                   # Mapeamento de rotas Express (Express Router)
│   ├── categoriaRoutes.js
│   ├── indexRoutes.js
│   ├── produtoRoutes.js
│   └── userRoutes.js
├── views/                    # Arquivos de visualização EJS
│   ├── layout.ejs            # Layout principal (contém o container global, navbar e scripts)
│   ├── index.ejs             # Página inicial (Dashboard / Home)
│   ├── partials/             # Componentes reutilizáveis
│   │   └── navbar.ejs        # Barra de navegação global
│   ├── categorias/           # Views específicas para categorias (index, create, edit, show)
│   ├── produtos/             # Views específicas para produtos (index, create, edit, show)
│   └── users/                # Views específicas para usuários (index, create, edit, show)
├── .env                      # Variáveis de ambiente locais (NÃO versionar credenciais sensíveis)
├── .gitignore                # Arquivos ignorados pelo Git
├── app.js                    # Ponto de entrada (Bootstrapping do Express e middlewares)
├── database.sql              # Scripts SQL para criação das tabelas e banco de dados
├── package.json              # Dependências e scripts do projeto
└── gemini.md                 # Guia de regras do projeto (este arquivo)
```

---

## 4. Padrões de Código e Convenções

### 4.1. Moduladidade e Sintaxe
* Utilizar **CommonJS** (`require(...)` e `module.exports = ...`).
* Manter nomes de arquivos em **camelCase** para controladores (`userController.js`), modelos (`userModel.js`) e rotas (`userRoutes.js`).
* Manter nomes de tabelas no banco em **minúsculo/plural** (`users`, `categorias`, `produtos`).

### 4.2. Camada de Modelo (`models/`)
* Os modelos utilizam objetos literais exportando métodos de banco.
* **Sempre utilizar consultas preparadas com placeholders (`?`)** para evitar ataques de SQL Injection.
* Adotar a convenção de **callbacks de erro em primeiro lugar**: `(err, result) => { ... }`.
* **Exemplo de padrão para Model:**
  ```javascript
  const db = require('../config/db');

  const EntityModel = {
      getAll: (callback) => {
          const query = 'SELECT * FROM tabela';
          db.query(query, (err, results) => {
              if (err) return callback(err);
              callback(null, results);
          });
      },

      findById: (id, callback) => {
          const query = 'SELECT * FROM tabela WHERE id = ?';
          db.query(query, [id], (err, results) => {
              if (err) return callback(err);
              callback(null, results[0]);
          });
      },
  };

  module.exports = EntityModel;
  ```

### 4.3. Camada de Controlador (`controllers/`)
* Tratar erros retornando resposta HTTP `500` em formato JSON se a consulta SQL falhar.
* Retornar `404` quando o registro buscado por ID não existir.
* Renderizar views EJS com dados (`res.render('diretorio/vista', { dados })`) após sucesso em métodos `GET`.
* Redirecionar (`res.redirect('/rota')`) após criação, edição ou exclusão bem-sucedida.
* **Exemplo de padrão para Controller:**
  ```javascript
  const Entity = require('../models/entityModel');

  const entityController = {
      getAll: (req, res) => {
          Entity.getAll((err, items) => {
              if (err) return res.status(500).json({ error: err });
              res.render('entities/index', { items });
          });
      },
      // ...
  };

  module.exports = entityController;
  ```

### 4.4. Camada de Rotas (`routes/`)
* Mapeamento padrão RESTful para rotas de formulários HTML e ações:
  * `GET /entidade` -> `getAll`
  * `GET /entidade/new` -> `renderCreateForm`
  * `POST /entidade` -> `create`
  * `GET /entidade/:id` -> `getById`
  * `GET /entidade/:id/edit` -> `renderEditForm`
  * `PUT /entidade/:id` -> `update`
  * `DELETE /entidade/:id` -> `delete`

### 4.5. Camada de Visualização (`views/`)
* O arquivo `views/layout.ejs` é o template mestre renderizado pelo `express-ejs-layouts`. As demais páginas injetam seu conteúdo via `<%- body %>`.
* Formulários de edição e exclusão devem usar a query string `?_method=PUT` ou `?_method=DELETE` no atributo `action` para interceptação pelo middleware `method-override`.
  ```html
  <form action="/users/<%= user.id %>?_method=PUT" method="POST">
  ```
* Utilizar classes do Bootstrap 5 para manter estilo uniforme em tabelas, formulários, botões e alertas.

---

## 5. Variáveis de Ambiente (`.env`)

A aplicação requer as seguintes variáveis configuradas no arquivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=CRUD
```

---

## 6. Scripts e Comandos Principais

* **Iniciar Servidor de Desenvolvimento:**
  ```bash
  npm run dev
  ```
* **Iniciar Servidor de Produção:**
  ```bash
  npm start
  ```

---

## 7. Passos para Adicionar uma Nova Entidade no Projeto

Ao solicitar ao agente a criação de um novo módulo/entidade no sistema, os seguintes passos devem ser seguidos integralmente:

1. **Atualizar `database.sql`:** Adicionar a instrução `CREATE TABLE` com os tipos e chaves estrangeiras apropriadas.
2. **Criar o Model (`models/<entidade>Model.js`):** Implementar métodos CRUD (`create`, `findById`, `update`, `delete`, `getAll`) utilizando queries parametrizadas `db.query`.
3. **Criar o Controller (`controllers/<entidade>Controller.js`):** Implementar os métodos que manipulam a requisição e chamam as rotas ou rendem as views EJS.
4. **Criar as Rotas (`routes/<entidade>Routes.js`):** Mapear as rotas REST usando `express.Router()`.
5. **Registrar Rotas no `app.js`:** Importar e utilizar o router em `app.use('/<entidade>', entidadeRoutes)`.
6. **Criar as Views EJS (`views/<entidade>/`):** Criar `index.ejs`, `create.ejs`, `edit.ejs` e `show.ejs`.
7. **Atualizar a Navbar (`views/partials/navbar.ejs`):** Adicionar o link de navegação para o novo módulo.
