# User Management System

Este é um sistema de gerenciamento de usuários desenvolvido com Node.js, Express e MySQL. Ele permite a criação, leitura, atualização e exclusão (CRUD) de usuários, com uma interface web para administradores e usuários.

## Funcionalidades

- Cadastro e login de usuários
- Listagem de usuários
- Criação, edição e exclusão de usuários
- Diferenciação entre administradores e usuários comuns

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework para construção de aplicativos web com Node.js.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **EJS**: Motor de visualização para renderizar páginas HTML.
- **Bootstrap**: Framework CSS para estilização das páginas.

## Instalação

### 1. Fork e Clone este Repositório

### 2. Instale as Dependências

Certifique-se de que você tem o Node.js e o MySQL instalados. Em seguida, execute o comando para instalar as dependências do projeto:

### 3. Configure o Banco de Dados

Crie um banco de dados no MySQL, por exemplo, user_management.

### 4. Execute o Aplicativo

Inicie o servidor com o comando:

node app.js

O servidor estará disponível em http://localhost:3000.

## Estrutura do Projeto

/CRUD
│
├── /views
│   ├── /partials
│   │   └── navbar.ejs
│   ├── layout.ejs
│   ├── create.ejs
│   ├── edit.ejs
│   ├── index.ejs
│   ├── show.ejs
│
├── /controllers
│   └── userController.js
│
├── /models
│   └── userModel.js
│
├── /routes
│   └── userRoutes.js
│
├── /config
│   └── database.js
│
├── app.js
├── package.json
└── README.md

## Fluxos do Sistema CRUD

### 1. Cadastro

#### 1.1 Cadastrar Usuário

**Exibir Formulário de Cadastro**

- Usuário clica em "Cadastrar Usuário"
- Navegador faz um GET para `/usuarios/new`
- Rota (`routes/userRoutes.js`) encontra a rota `GET /new` e chama o controlador
- Controlador (`controllers/userController.js`) executa a função para renderizar o formulário
- Visualização (`views/create.ejs`) é processada e enviada ao navegador
- Navegador exibe o formulário para o usuário

**Enviar Dados do Formulário**

- Usuário preenche o formulário e clica em "Salvar"
- Navegador faz um POST para `/usuarios` com os dados do formulário
- Rota (`routes/userRoutes.js`) encontra a rota `POST /` e chama o controlador
- Controlador (`controllers/userController.js`) pega os dados do formulário e chama o modelo
- Modelo (`models/userModel.js`) executa a query de inserção no banco de dados
- Controlador recebe a resposta do modelo
    - Se sucesso: redireciona para `/usuarios`
    - Se erro: renderiza o formulário novamente com mensagem de erro
- Navegador segue o redirecionamento e exibe a lista de usuários

---

#### 1.2 Cadastrar Categorias

**Exibir Formulário de Cadastro**

- Usuário clica em "Cadastrar Categoria"
- Navegador faz um GET para `/categorias/new`
- Rota (`routes/categoriaRoutes.js`) encontra a rota `GET /new` e chama o controlador
- Controlador (`controllers/categoriaController.js`) executa a função para renderizar o formulário
- Visualização (`views/categorias/create.ejs`) é processada e enviada ao navegador
- Navegador exibe o formulário para o usuário

**Enviar Dados do Formulário**

- Usuário preenche o formulário e clica em "Salvar"
- Navegador faz um POST para `/categorias` com os dados do formulário
- Rota (`routes/categoriaRoutes.js`) encontra a rota `POST /` e chama o controlador
- Controlador (`controllers/categoriaController.js`) pega os dados do formulário e chama o modelo
- Modelo (`models/categoriaModel.js`) executa a query de inserção no banco de dados
- Controlador recebe a resposta do modelo
    - Se sucesso: redireciona para `/categorias`
    - Se erro: renderiza o formulário novamente com mensagem de erro
- Navegador segue o redirecionamento e exibe a lista de categorias

---

#### 1.3 Cadastrar Produtos

**Exibir Formulário de Cadastro**

- Usuário clica em "Cadastrar Produto"
- Navegador faz um GET para `/produtos/new`
- Rota (`routes/produtoRoutes.js`) encontra a rota `GET /new` e chama o controlador
- Controlador (`controllers/produtoController.js`) executa a função para renderizar o formulário
- Visualização (`views/produtos/create.ejs`) é processada e enviada ao navegador
- Navegador exibe o formulário para o usuário

**Enviar Dados do Formulário**

- Usuário preenche o formulário e clica em "Salvar"
- Navegador faz um POST para `/produtos` com os dados do formulário
- Rota (`routes/produtoRoutes.js`) encontra a rota `POST /` e chama o controlador
- Controlador (`controllers/produtoController.js`) pega os dados do formulário e chama o modelo
- Modelo (`models/produtoModel.js`) executa a query de inserção no banco de dados
- Controlador recebe a resposta do modelo
    - Se sucesso: redireciona para `/produtos`
    - Se erro: renderiza o formulário novamente com mensagem de erro
- Navegador segue o redirecionamento e exibe a lista de produtos

---

#### 1.4 Cadastrar Fornecedores

**Exibir Formulário de Cadastro**

- Usuário clica em "Cadastrar Fornecedor"
- Navegador faz um GET para `/fornecedores/new`
- Rota (`routes/fornecedorRoutes.js`) encontra a rota `GET /new` e chama o controlador
- Controlador (`controllers/fornecedorController.js`) executa a função para renderizar o formulário
- Visualização (`views/fornecedores/create.ejs`) é processada e enviada ao navegador
- Navegador exibe o formulário para o usuário

**Enviar Dados do Formulário**

- Usuário preenche o formulário e clica em "Salvar"
- Navegador faz um POST para `/fornecedores` com os dados do formulário
- Rota (`routes/fornecedorRoutes.js`) encontra a rota `POST /` e chama o controlador
- Controlador (`controllers/fornecedorController.js`) pega os dados do formulário e chama o modelo
- Modelo (`models/fornecedorModel.js`) executa a query de inserção no banco de dados
- Controlador recebe a resposta do modelo
    - Se sucesso: redireciona para `/fornecedores`
    - Se erro: renderiza o formulário novamente com mensagem de erro
- Navegador segue o redirecionamento e exibe a lista de fornecedores

---

### 2. Listagem

#### 2.1 Listar Usuários

- Usuário acessa `/usuarios`
- Rota (`routes/userRoutes.js`) encontra a rota `GET /` e chama o controlador
- Controlador (`controllers/userController.js`) chama o modelo para buscar todos os usuários
- Modelo (`models/userModel.js`) executa a query de seleção
- Controlador recebe os dados e renderiza a visualização (`views/index.ejs`)
- Navegador exibe a lista de usuários

#### 2.2 Listar Categorias

- Usuário acessa `/categorias`
- Rota (`routes/categoriaRoutes.js`) encontra a rota `GET /` e chama o controlador
- Controlador (`controllers/categoriaController.js`) chama o modelo para buscar todas as categorias
- Modelo (`models/categoriaModel.js`) executa a query de seleção
- Controlador recebe os dados e renderiza a visualização (`views/categorias/index.ejs`)
- Navegador exibe a lista de categorias

#### 2.3 Listar Produtos

- Usuário acessa `/produtos`
- Rota (`routes/produtoRoutes.js`) encontra a rota `GET /` e chama o controlador
- Controlador (`controllers/produtoController.js`) chama o modelo para buscar todos os produtos
- Modelo (`models/produtoModel.js`) executa a query de seleção
- Controlador recebe os dados e renderiza a visualização (`views/produtos/index.ejs`)
- Navegador exibe a lista de produtos

#### 2.4 Listar Fornecedores

- Usuário acessa `/fornecedores`
- Rota (`routes/fornecedorRoutes.js`) encontra a rota `GET /` e chama o controlador
- Controlador (`controllers/fornecedorController.js`) chama o modelo para buscar todos os fornecedores
- Modelo (`models/fornecedorModel.js`) executa a query de seleção
- Controlador recebe os dados e renderiza a visualização (`views/fornecedores/index.ejs`)
- Navegador exibe a lista de fornecedores

---

### 3. Visualizar Detalhes

#### 3.1 Visualizar Detalhes do Usuário

- Usuário clica em "View" na lista de usuários
- Navegador faz um GET para `/usuarios/:id`
- Rota (`routes/userRoutes.js`) encontra a rota `GET /:id` e chama o controlador
- Controlador chama o modelo para buscar o usuário pelo ID
- Modelo (`models/userModel.js`) executa a query de seleção
- Controlador renderiza a visualização (`views/show.ejs`) com os dados
- Navegador exibe os detalhes do usuário

#### 3.2 Visualizar Detalhes da Categoria

- Usuário clica em "View" na lista de categorias
- Navegador faz um GET para `/categorias/:id`
- Rota (`routes/categoriaRoutes.js`) encontra a rota `GET /:id` e chama o controlador
- Controlador chama o modelo para buscar a categoria pelo ID
- Modelo (`models/categoriaModel.js`) executa a query de seleção
- Controlador renderiza a visualização (`views/categorias/show.ejs`) com os dados
- Navegador exibe os detalhes da categoria

#### 3.3 Visualizar Detalhes do Produto

- Usuário clica em "View" na lista de produtos
- Navegador faz um GET para `/produtos/:id`
- Rota (`routes/produtoRoutes.js`) encontra a rota `GET /:id` e chama o controlador
- Controlador chama o modelo para buscar o produto pelo ID
- Modelo (`models/produtoModel.js`) executa a query de seleção
- Controlador renderiza a visualização (`views/produtos/show.ejs`) com os dados
- Navegador exibe os detalhes do produto

#### 3.4 Visualizar Detalhes do Fornecedor

- Usuário clica em "View" na lista de fornecedores
- Navegador faz um GET para `/fornecedores/:id`
- Rota (`routes/fornecedorRoutes.js`) encontra a rota `GET /:id` e chama o controlador
- Controlador chama o modelo para buscar o fornecedor pelo ID
- Modelo (`models/fornecedorModel.js`) executa a query de seleção
- Controlador renderiza a visualização (`views/fornecedores/show.ejs`) com os dados
- Navegador exibe os detalhes do fornecedor

---

### 4. Editar

#### 4.1 Editar Usuário

**Exibir Formulário de Edição**

- Usuário clica em "Edit" na lista de usuários
- Navegador faz um GET para `/usuarios/:id/edit`
- Rota (`routes/userRoutes.js`) encontra a rota `GET /:id/edit` e chama o controlador
- Controlador chama o modelo para buscar o usuário pelo ID
- Modelo (`models/userModel.js`) executa a query de seleção
- Controlador renderiza a visualização (`views/edit.ejs`) com os dados
- Navegador exibe o formulário preenchido

**Enviar Alterações**

- Usuário altera os dados e clica em "Salvar"
- Navegador faz um PUT para `/usuarios/:id` com os dados atualizados
- Rota (`routes/userRoutes.js`) encontra a rota `PUT /:id` e chama o controlador
- Controlador chama o modelo para atualizar o usuário
- Modelo (`models/userModel.js`) executa a query de atualização
- Controlador redireciona para `/usuarios`
- Navegador exibe a lista de usuários atualizada

#### 4.2 Editar Categoria

**Exibir Formulário de Edição**

- Usuário clica em "Edit" na lista de categorias
- Navegador faz um GET para `/categorias/:id/edit`
- Rota (`routes/categoriaRoutes.js`) encontra a rota `GET /:id/edit` e chama o controlador
- Controlador chama o modelo para buscar a categoria pelo ID
- Modelo (`models/categoriaModel.js`) executa a query de seleção
- Controlador renderiza a visualização (`views/categorias/edit.ejs`) com os dados
- Navegador exibe o formulário preenchido

**Enviar Alterações**

- Usuário altera os dados e clica em "Salvar"
- Navegador faz um PUT para `/categorias/:id` com os dados atualizados
- Rota (`routes/categoriaRoutes.js`) encontra a rota `PUT /:id` e chama o controlador
- Controlador chama o modelo para atualizar a categoria
- Modelo (`models/categoriaModel.js`) executa a query de atualização
- Controlador redireciona para `/categorias`
- Navegador exibe a lista de categorias atualizada

#### 4.3 Editar Produto

**Exibir Formulário de Edição**

- Usuário clica em "Edit" na lista de produtos
- Navegador faz um GET para `/produtos/:id/edit`
- Rota (`routes/produtoRoutes.js`) encontra a rota `GET /:id/edit` e chama o controlador
- Controlador chama o modelo para buscar o produto pelo ID
- Modelo (`models/produtoModel.js`) executa a query de seleção
- Controlador renderiza a visualização (`views/produtos/edit.ejs`) com os dados
- Navegador exibe o formulário preenchido

**Enviar Alterações**

- Usuário altera os dados e clica em "Salvar"
- Navegador faz um PUT para `/produtos/:id` com os dados atualizados
- Rota (`routes/produtoRoutes.js`) encontra a rota `PUT /:id` e chama o controlador
- Controlador chama o modelo para atualizar o produto
- Modelo (`models/produtoModel.js`) executa a query de atualização
- Controlador redireciona para `/produtos`
- Navegador exibe a lista de produtos atualizada

#### 4.4 Editar Fornecedor

**Exibir Formulário de Edição**

- Usuário clica em "Edit" na lista de fornecedores
- Navegador faz um GET para `/fornecedores/:id/edit`
- Rota (`routes/fornecedorRoutes.js`) encontra a rota `GET /:id/edit` e chama o controlador
- Controlador chama o modelo para buscar o fornecedor pelo ID
- Modelo (`models/fornecedorModel.js`) executa a query de seleção
- Controlador renderiza a visualização (`views/fornecedores/edit.ejs`) com os dados
- Navegador exibe o formulário preenchido

**Enviar Alterações**

- Usuário altera os dados e clica em "Salvar"
- Navegador faz um PUT para `/fornecedores/:id` com os dados atualizados
- Rota (`routes/fornecedorRoutes.js`) encontra a rota `PUT /:id` e chama o controlador
- Controlador chama o modelo para atualizar o fornecedor
- Modelo (`models/fornecedorModel.js`) executa a query de atualização
- Controlador redireciona para `/fornecedores`
- Navegador exibe a lista de fornecedores atualizada

---

### 5. Excluir

#### 5.1 Excluir Usuário

- Usuário clica em "Delete" na lista de usuários
- Navegador faz um DELETE para `/usuarios/:id`
- Rota (`routes/userRoutes.js`) encontra a rota `DELETE /:id` e chama o controlador
- Controlador chama o modelo para excluir o usuário
- Modelo (`models/userModel.js`) executa a query de exclusão
- Controlador redireciona para `/usuarios`
- Navegador exibe a lista de usuários atualizada

#### 5.2 Excluir Categoria

- Usuário clica em "Delete" na lista de categorias
- Navegador faz um DELETE para `/categorias/:id`
- Rota (`routes/categoriaRoutes.js`) encontra a rota `DELETE /:id` e chama o controlador
- Controlador chama o modelo para excluir a categoria
- Modelo (`models/categoriaModel.js`) executa a query de exclusão
- Controlador redireciona para `/categorias`
- Navegador exibe a lista de categorias atualizada

#### 5.3 Excluir Produto

- Usuário clica em "Delete" na lista de produtos
- Navegador faz um DELETE para `/produtos/:id`
- Rota (`routes/produtoRoutes.js`) encontra a rota `DELETE /:id` e chama o controlador
- Controlador chama o modelo para excluir o produto
- Modelo (`models/produtoModel.js`) executa a query de exclusão
- Controlador redireciona para `/produtos`
- Navegador exibe a lista de produtos atualizada

#### 5.4 Excluir Fornecedor

- Usuário clica em "Delete" na lista de fornecedores
- Navegador faz um DELETE para `/fornecedores/:id`
- Rota (`routes/fornecedorRoutes.js`) encontra a rota `DELETE /:id` e chama o controlador
- Controlador chama o modelo para excluir o fornecedor
- Modelo (`models/fornecedorModel.js`) executa a query de exclusão
- Controlador redireciona para `/fornecedores`
- Navegador exibe a lista de fornecedores atualizada

---

Esses fluxos garantem a separação entre as camadas de rota, controlador, modelo e visualização, facilitando a manutenção e expansão do sistema.

Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Abra uma issue ou envie um pull request para colaborar com o projeto.
Licença

Este projeto é licenciado sob a MIT License.