const db = require('../config/db');

const Venda = {
    create: (venda, callback) => {
        const query = 'INSERT INTO vendas (nome, descricao, preco, quantidade, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [venda.user_id, venda.produto_id, venda.quantidade, venda.data_compra], (err, results) => {
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
        const query = 'UPDATE vendas SET user_id = ?, produto_id = ?, quantidade = ?, data_compra = ?, WHERE id = ?';
        db.query(query, [venda.user_id, venda.produto_id, venda.quantidade, venda.data_compra], (err, results) => {
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
        let query = 'SELECT vendas.id, vendas.user_id, vendas.produto_id, vendas.quantidade, vendas.data_compra, categorias.nome AS categoria_nome FROM vendas JOIN categorias ON vendas.categoria = categorias.id';
        
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