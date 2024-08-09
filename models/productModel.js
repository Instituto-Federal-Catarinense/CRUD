const db = require('../config/db');

const Product = {
    // Cria um novo produto
    create: (product, callback) => {
        const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
        db.query(query, [product.name, product.price, product.description], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Encontra um produto por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Atualiza um produto existente
    update: (id, product, callback) => {
        const query = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
        db.query(query, [product.name, product.price, product.description, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Deleta um produto por ID
    delete: (id, callback) => {
        const query = 'DELETE FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Obtém todos os produtos
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Product;
