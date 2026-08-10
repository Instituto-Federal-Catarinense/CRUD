// Cria o primeiro usuário admin, já com a senha hasheada.
// Necessário porque, com as rotas protegidas, não existe mais uma tela
// pública para cadastrar o primeiro usuário do sistema.
//
// Uso:
//   node scripts/seedAdmin.js [usuario] [senha]
//   npm run seed:admin -- meuAdmin minhaSenha123
//
// Se usuario/senha não forem informados, usa admin / admin123.

require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const username = process.argv[2] || 'admin';
const password = process.argv[3] || 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Erro ao gerar hash da senha:', err);
        process.exit(1);
    }

    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, hash, 'admin'], (err, result) => {
        if (err) {
            console.error('Erro ao criar usuário admin:', err.message);
            process.exit(1);
        }

        console.log(`Usuário admin "${username}" criado com sucesso (id ${result.insertId}).`);
        console.log('Lembre-se de trocar a senha padrão caso não a tenha informado manualmente.');
        process.exit(0);
    });
});
