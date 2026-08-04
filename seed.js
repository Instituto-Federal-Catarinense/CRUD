const db = require('./config/db');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
    const adminPassword = bcrypt.hashSync('admin123', 10);
    const userPassword = bcrypt.hashSync('user123', 10);

    const query = `
        INSERT INTO users (username, password, role) 
        VALUES (?, ?, ?), (?, ?, ?)
        ON DUPLICATE KEY UPDATE username=VALUES(username);
    `;

    db.query(query, ['admin', adminPassword, 'admin', 'user', userPassword, 'user'], (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuários iniciais:', err);
        } else {
            console.log('Usuários "admin" e "user" criados com sucesso!');
        }
        db.end();
    });
};

seedUsers();
