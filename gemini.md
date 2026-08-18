# Diretrizes e Regras do Projeto (gemini.md)

Este arquivo sintetiza a arquitetura, convenções, padrões de código e diretrizes do projeto **CRUD** (Node.js + Express + EJS + MySQL) para orientação de assistentes de IA e desenvolvedores em futuros prompts.

---

## 1. Visão Geral da Tecnologia e Stack

- **Backend Runtime**: Node.js
- **Framework Web**: Express (`express`)
- **Template Engine**: EJS (`ejs`) com `express-ejs-layouts`
- **Banco de Dados**: MySQL gerenciado via driver `mysql2`
- **Variáveis de Ambiente**: `dotenv` para carregar credenciais do `.env`
- **Body Parsing & Override HTTP**: `body-parser` (JSON e URL-encoded) e `method-override` (usando `_method`)
- **Estilização / Frontend UI**: Bootstrap 4.5.2 (via CDN) com estilos customizados centralizados em `views/layout.ejs`
- **Scripts de Execução**:
  - `npm start` (`node app.js`)
  - `npm run dev` (`nodemon app.js`)

---

## 2. Arquitetura e Estrutura de Diretórios (MVC)

O projeto adota rigorosamente a arquitetura **MVC (Model-View-Controller)** acoplada a um roteador modular no Express:

```text
/CRUD
├── config/             # Configuração e conexão com banco de dados (db.js)
├── controllers/        # Controladores (regra de negócio e gestão de requisição/resposta)
├── models/             # Camada de dados e consultas SQL puras (db.query)
├── routes/             # Definições de rotas com express.Router
├── views/              # Templates EJS (layout base, partials e views de cada entidade)
│   ├── partials/       # Componentes visuais reutilizáveis (ex: navbar.ejs)
│   ├── categorias/     # Views da entidade categorias
│   ├── produtos/       # Views da entidade produtos
│   ├── users/          # Views da entidade usuários
│   ├── index.ejs       # Página inicial do sistema
│   └── layout.ejs      # Layout base (contém Bootstrap, <%- include(...) %> e <%- body %>)
├── .env                # Configurações locais de ambiente (não versionado)
├── app.js              # Ponto de entrada (iniciador do Express e registro de middlewares/rotas)
├── database.sql        # Scripts DDL para criação do banco de dados e tabelas MySQL
└── package.json        # Manifesto do projeto e dependências
```

---

## 3. Convenções e Padrões de Código

### 3.1. Models (`models/*Model.js`)
- **Consultas em SQL puro**: Utilizar `db.query` comPrepared Statements (placeholders `?`) para prevenção contra SQL Injection.
- **Padrão de Callback**: As funções do model aceitam uma função de callback `(err, result) => {}`.
  - Retorno em erro: `callback(err)`
  - Retorno em sucesso: `callback(null, result)` ou `callback(null, results.insertId)` / `callback(null, results[0])`.
- **Métodos Padrão**:
  - `create(entity, callback)`
  - `findById(id, callback)`
  - `getAll(filter/params, callback)`
  - `update(id, entity, callback)`
  - `delete(id, callback)`

### 3.2. Controllers (`controllers/*Controller.js`)
- Intermediam a requisição HTTP `(req, res)` e as chamadas aos Models.
- **Tratamento de Erros**:
  - Em erros de banco/execução: Retornar status HTTP `500` com JSON `{ error: err }`.
  - Em buscas sem resultados esperados: Retornar status HTTP `404` com JSON `{ message: '<Entidade> not found' }`.
- **Fluxo de Resposta**:
  - Operações de leitura (`GET`): Renderizam a view correspondente via `res.render('entidade/view', { dados })`.
  - Operações de escrita (`POST`, `PUT`, `DELETE`): Redirecionam para a rota da listagem com `res.redirect('/entidade')`.

### 3.3. Rotas (`routes/*Routes.js`)
- Cada entidade possui seu próprio arquivo de rotas usando `express.Router()`.
- Seguem a estrutura RESTful para aplicações baseadas em HTML/Forms:
  - `GET /` → Lista todos (`getAll...`)
  - `GET /new` → Exibe formulário de criação (`renderCreateForm`)
  - `POST /` → Processa criação (`create...`)
  - `GET /:id` → Exibe detalhes (`get...ById`)
  - `GET /:id/edit` → Exibe formulário de edição (`renderEditForm`)
  - `PUT /:id` → Processa atualização (`update...`)
  - `DELETE /:id` → Processa exclusão (`delete...`)
- As rotas devem ser registradas no `app.js` com o prefixo apropriado (ex: `app.use('/produtos', produtoRoutes)`).

### 3.4. Views e Interface EJS (`views/`)
- Utilizam `express-ejs-layouts`. O layout mestre é o `views/layout.ejs`.
- Formulários de edição/exclusão devem usar o `method-override` via parâmetro de query (ex: `<form action="/produtos/<%= produto.id %>?_method=PUT" method="POST">` ou `?_method=DELETE`).
- Reutilização da barra de navegação através de `<%- include('partials/navbar') %>`.

### 3.5. Banco de Dados e Variáveis de Ambiente (`config/db.js`)
- Conexão MySQL configurada via `mysql2.createConnection()`.
- Variáveis obrigatórias no `.env`:
  - `DB_HOST`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
  - `PORT` (porta do servidor Express, padrão 3000)

---

## 4. Diretrizes para Futuras Alterações e Prompts

1. **Respeitar a Separação de Camadas**:
   - **NUNCA** inserir queries SQL diretamente nos controllers ou nas rotas. Elas pertencem exclusivamente aos `models`.
   - **NUNCA** colocar regras de rotas ou manipulação de banco diretamente no `app.js`.

2. **Checklist para Adição de Novas Entidades / Módulos**:
   Ao solicitar ou implementar uma nova entidade (ex: `vendas`):
   - [ ] Adicionar/Atualizar a estrutura da tabela no `database.sql`.
   - [ ] Criar o modelo em `models/<entidade>Model.js`.
   - [ ] Criar o controlador em `controllers/<entidade>Controller.js`.
   - [ ] Criar o arquivo de rotas em `routes/<entidade>Routes.js`.
   - [ ] Registrar a nova rota no `app.js`.
   - [ ] Criar a pasta de views `views/<entidade>/` com os arquivos `index.ejs`, `create.ejs`, `edit.ejs` e `show.ejs`.
   - [ ] Atualizar o menu em `views/partials/navbar.ejs` para incluir os links do novo módulo.

3. **Manutenção do Código e Boas Práticas**:
   - Manter prepared statements em todas as queries (`?`).
   - Manter consistência nos nomes de tabelas/colunas (banco em minúsculo/snake_case ex: `quantidade`, `produto_id`, `categoria`).
   - Tratar retornos nulos antes de renderizar views de edição ou detalhes.
