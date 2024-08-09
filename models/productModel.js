const db = require('../config/db');

const Product = {
    create: (product, callback) => {
        const query = 'INSERT INTO products (title, author, genre, price, stock) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [product.title, product.author, product.genre, product.price, product.stock], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, product, callback) => {
        const query = 'UPDATE products SET title = ?, author = ?, genre = ?, price = ?, stock = ? WHERE id = ?';
        db.query(query, [product.title, product.author, product.genre, product.price, product.stock, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

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
