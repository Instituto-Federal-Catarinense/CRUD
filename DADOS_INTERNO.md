# Sistema de Armazenamento Interno

Este projeto foi modificado para usar **armazenamento interno em arquivo JSON** em vez de um banco de dados MySQL.

## 📁 Localização dos Dados

Todos os dados (usuários, categorias, produtos) são armazenados em:
```
CRUD/data/users.json
```

## 🔐 Credenciais Padrão

O sistema vem com dois usuários pré-configurados:

| Usuário | Senha   | Função  |
|---------|---------|---------|
| admin   | admin123| Admin   |
| user    | user123 | Usuário |

## 📝 Estrutura do Arquivo de Dados

```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "$2a$10$...",  // Hash bcrypt
      "role": "admin"
    }
  ],
  "categorias": [
    {
      "id": 1,
      "nome": "Eletrônicos"
    }
  ],
  "produtos": [
    {
      "id": 1,
      "nome": "Notebook",
      "descricao": "...",
      "preco": 3500.00,
      "quantidade": 10,
      "categoria": 1
    }
  ],
  "nextId": 3
}
```

## 🔒 Segurança de Senhas

- As senhas são criptografadas com **bcrypt**
- As senhas antigas em texto puro são convertidas automaticamente para hash no primeiro login
- Nunca acesse ou modifique as senhas diretamente no arquivo JSON

## 🚀 Como Usar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm start
```

3. Acesse em `http://localhost:3000`

4. Faça login com as credenciais padrão

## ⚙️ Arquivos Modificados

- **dataStore.js** (novo): Gerencia leitura/escrita do arquivo de dados
- **models/userModel.js**: Atualizado para usar dataStore
- **models/categoriaModel.js**: Atualizado para usar dataStore
- **models/produtoModel.js**: Atualizado para usar dataStore

## ✨ Principais Mudanças

- ✅ Sem dependência de MySQL
- ✅ Dados persistem em arquivo JSON
- ✅ Operações sincronizadas de leitura/escrita
- ✅ Todas as funcionalidades CRUD mantidas
- ✅ Sistema de sessão ainda usando express-session
