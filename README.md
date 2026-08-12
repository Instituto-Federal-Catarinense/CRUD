# CRUD adapted to Cantina Federal schema

This project was refactored to work with the `cantina_federal` migration (see `migration_script.sql`).

Quick start:
1. Copy `.env.example` to `.env` and set DB credentials.
2. Run `npm install`.
3. Run `npm run dev`.
4. Visit http://localhost:3000/

Key routes:
- /users -> clientes CRUD
- /produtos -> produtos CRUD
- /pedidos -> pedidos CRUD (includes items)

If you see SQL errors about missing tables, run the migration SQL in your MySQL server or adjust DB_NAME in `.env`.