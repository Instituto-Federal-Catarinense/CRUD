const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (nome, descricao, preco, quantidade, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [venda.nome, venda.descricao, venda.preco, venda.quantidade, venda.categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT vendas.*, categorias.nome AS categoria_nome FROM vendas JOIN categorias ON vendas.categoria = categorias.id WHERE vendas.id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, venda, callback) => {
        const query = 'UPDATE vendas SET nome = ?, preco = ?, descricao = ?, quantidade = ?, categoria = ? WHERE id = ?';
        db.query(query, [venda.nome, venda.preco, venda.descricao, venda.quantidade, venda.categoria, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM vendas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (categoria, callback) => {
        let query = 'SELECT vendas.id, vendas.nome, vendas.descricao, vendas.preco, vendas.quantidade, categorias.nome AS categoria_nome FROM vendas JOIN categorias ON vendas.categoria = categorias.id';
        
        if (categoria) {
            query += ' WHERE vendas.categoria = ?';
        }
    
        db.query(query, [categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    
};

module.exports = Venda;