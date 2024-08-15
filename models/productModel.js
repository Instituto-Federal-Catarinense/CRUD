const db = require('../config/db');

const Product = {
    // Cria um novo produto na base de dados
    create: (product, callback) => {
        const query = 'INSERT INTO products (title, author, genre, price, stock) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [product.title, product.author, product.genre, product.price, product.stock], (err, results) => {
            if (err) {
                return callback(err); // Passa o erro para o callback
            }
            callback(null, results.insertId); // Retorna o ID do novo produto
        });
    },

    // Encontra um produto pelo seu ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err); // Passa o erro para o callback
            }
            callback(null, results[0]); // Retorna o produto encontrado
        });
    },

    // Atualiza um produto existente
    update: (id, product, callback) => {
        const query = 'UPDATE products SET title = ?, author = ?, genre = ?, price = ?, stock = ? WHERE id = ?';
        db.query(query, [product.title, product.author, product.genre, product.price, product.stock, id], (err, results) => {
            if (err) {
                return callback(err); // Passa o erro para o callback
            }
            callback(null, results); // Retorna o resultado da atualização
        });
    },

    // Remove um produto pelo seu ID
    delete: (id, callback) => {
        const query = 'DELETE FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err); // Passa o erro para o callback
            }
            callback(null, results); // Retorna o resultado da remoção
        });
    },

    // Obtém todos os produtos da base de dados
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err); // Passa o erro para o callback
            }
            callback(null, results); // Retorna todos os produtos
        });
    },
};

module.exports = Product;
