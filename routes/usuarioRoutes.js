const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // ajuste conforme seu usuário
    password: '1234', // ajuste conforme sua senha
    database: 'CRUD'
});

// Listar usuários
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar usuários');
        res.render('usuarios/usuarios', { usuarios: results });
    });
});

// Salvar novo usuário
router.post('/criar', (req, res) => {
    const { nome, descricao } = req.body;
    // Usando nome como usuarioname, descricao como password (apenas para exemplo)
    db.query(
        'INSERT INTO usuarios (usuarioname, password, role) VALUES (?, ?, ?)',
        [nome, descricao, 'user'],
        (err) => {
            if (err) return res.status(500).send('Erro ao criar usuário');
            res.redirect('/usuarios');
        }
    );
});

module.exports = router;