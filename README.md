# User Management System

Este é um sistema de gerenciamento de usuários desenvolvido com Node.js, Express e MySQL. Ele permite a criação, leitura, atualização e exclusão (CRUD) de usuários, com uma interface web para administradores e usuários.

## Funcionalidades

- Cadastro e login de usuários
- Listagem de usuários
- Criação, edição e exclusão de usuários
- Diferenciação entre administradores e usuários comuns
- Autenticação com sessão e middleware
- Validação de dados no servidor

## Conceitos abordados

### 1. Arquitetura MVC
- Separação entre controllers, models, routes e views.
- Organização das pastas para manter a aplicação escalável.

### 2. Banco de dados com ORM
- O projeto usa MySQL com queries diretas e pode evoluir para Sequelize.
- Estrutura de modelos e relacionamentos já preparada para a próxima etapa.

### 3. Autenticação e controle de acesso
- Login com sessão.
- Middleware de autenticação para proteger rotas.
- Controle por perfil com papéis de admin e user.

### 4. Validação de dados
- Validação no servidor para usuário e produto.
- Tratamento de erros com mensagens de feedback para o usuário.

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

Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Abra uma issue ou envie um pull request para colaborar com o projeto.
Licença

Este projeto é licenciado sob a MIT License.