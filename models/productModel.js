const db = require('../config/db');

const Product = {
    create: (product, callback) => {
        const query = 'INSERT INTO products (name, price, category) VALUES (?, ?, ?)';
        db.query(query, [product.name, product.price, product.category], (err, results) => {
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

    findByName: (name, callback) => {
        const query = 'SELECT * FROM products WHERE name = ?';
        db.query(query, [name], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, product, callback) => {
        const query = 'UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?';
        db.query(query, [product.name, product.price, product.category, id], (err, results) => {
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