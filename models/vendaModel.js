const db = require('../config/db');

const Venda = {
    create: (produto, callback) => {
        const query = 'INSERT INTO venda (nome, descricao, preco, quantidade, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT produtos.*, categorias.nome AS categoria_nome FROM produtos JOIN categorias ON produtos.categoria = categorias.id WHERE produtos.id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, produto, callback) => {
        const query = 'UPDATE produtos SET nome = ?, preco = ?, descricao = ?, quantidade = ?, categoria = ? WHERE id = ?';
        db.query(query, [produto.nome, produto.preco, produto.descricao, produto.quantidade, produto.categoria, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: () => {
        let query = 'SELECT * FROM CRUD.vendas';
        
      
    
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    
};

module.exports = Venda;