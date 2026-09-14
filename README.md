# CRUD adaptado ao esquema Cantina Federal

Este projeto foi refatorado para funcionar com a `migration cantina_federal` (consulte migration_script.sql).

Início rápido:

Copie `.env.example` para `.env` e configure as credenciais do banco de dados.
Execute `npm install.`
Execute `npm run dev.`
Acesse http://localhost:3000/

Principais rotas:

/users → CRUD de clientes
/produtos → CRUD de produtos
/pedidos → CRUD de pedidos (inclui os itens)

Se você encontrar erros de SQL relacionados a tabelas inexistentes, execute o SQL da migration no seu servidor MySQL ou ajuste DB_NAME no arquivo `.env.`
