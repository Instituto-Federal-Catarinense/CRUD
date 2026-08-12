const argon2 = require('argon2');
const db = require('../config/db');

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
    console.log('Uso: node scripts/createAdmin.js <usuario> <senha>');
    process.exit(1);
}

db.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
        console.error('Erro ao consultar o banco:', err);
        db.end();
        process.exit(1);
    }

    if (results.length > 0) {
        console.log(`Usuário "${username}" já existe.`);
        db.end();
        process.exit(0);
    }

    argon2.hash(password, { type: argon2.argon2id })
        .then((hash) => {
            db.query(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, hash, 'admin'],
                (insertErr) => {
                    if (insertErr) {
                        console.error('Erro ao criar o usuário:', insertErr);
                        db.end();
                        process.exit(1);
                    }
                    console.log(`Usuário admin "${username}" criado com sucesso.`);
                    db.end();
                    process.exit(0);
                }
            );
        })
        .catch((hashErr) => {
            console.error('Erro ao gerar o hash:', hashErr);
            db.end();
            process.exit(1);
        });
});
