# User Management System

Este é um sistema de gerenciamento de usuários desenvolvido com Node.js, Express e MySQL. Ele permite a criação, leitura, atualização e exclusão (CRUD) de usuários, com uma interface web para administradores e usuários.

## Funcionalidades

- Cadastro e login de usuários
- Listagem de usuários
- Criação, edição e exclusão de usuários
- Diferenciação entre administradores e usuários comuns
- Autenticação via JWT (cookie httpOnly)
- Senhas criptografadas com argon2id
- Controle de acesso por middleware (admin vs. usuário comum)

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework para construção de aplicativos web com Node.js.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **EJS**: Motor de visualização para renderizar páginas HTML.
- **Bootstrap**: Framework CSS para estilização das páginas.
- **JWT (jsonwebtoken)**: Tokens de autenticação em cookie httpOnly.
- **argon2**: Hash de senhas com o algoritmo argon2id.

## Instalação

### 1. Fork e Clone este Repositório

### 2. Instale as Dependências

Certifique-se de que você tem o Node.js e o MySQL instalados. Em seguida, execute o comando para instalar as dependências do projeto:

### 3. Configure o Banco de Dados

Crie um banco de dados no MySQL, por exemplo, user_management. Execute o script `database.sql`.

### 4. Configure o Ambiente

Crie um arquivo `.env` (não versionado) a partir do exemplo:

```
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="sua_senha"
DB_NAME="CRUD"
JWT_SECRET="gerar_um_segredo_longo_e_aleatorio"
JWT_EXPIRES_IN="2h"
```

### 5. Crie o Usuário Administrador

As senhas são armazenadas com hash argon2id, portanto não insira o admin manualmente no banco. Execute o script:

```
node scripts/createAdmin.js <usuario> <senha>
```

### 6. Execute o Aplicativo

Inicie o servidor com o comando:

node app.js

O servidor estará disponível em http://localhost:3000.

## Controle de Acesso

| Recurso | Usuário comum | Admin |
| --- | --- | --- |
| Listar produtos e categorias | Sim | Sim |
| Criar/editar/excluir produtos e categorias | Não | Sim |
| Gerenciar usuários | Não | Sim |

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