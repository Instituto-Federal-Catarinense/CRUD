// scripts/createAdmin.js
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const createAdmin = () => {
    const username = 'admin';
    const password = 'admin123';
    const role = 'admin';

    // Verificar se admin já existe
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkQuery, [username], (err, results) => {
        if (err) {
            console.error('Erro ao verificar admin:', err);
            process.exit(1);
        }

        if (results.length > 0) {
            console.log('Admin já existe!');
            console.log('Usuário:', username);
            console.log('Senha:', password);
            process.exit(0);
        }

        // Criar hash da senha
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Erro ao criar hash:', err);
                process.exit(1);
            }

            const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
            db.query(query, [username, hash, role], (err, results) => {
                if (err) {
                    console.error('Erro ao criar admin:', err);
                    process.exit(1);
                }
                console.log('✅ Admin criado com sucesso!');
                console.log('👤 Usuário:', username);
                console.log('🔑 Senha:', password);
                console.log('👑 Role:', role);
                process.exit(0);
            });
        });
    });
};

createAdmin();