const db = require('../config/db');

const Pagamentos = {
    create: (pagamento, callback) => {
        const query = 'INSERT INTO pagamentos (appointment_id, amount, payment_method, status, transaction_date) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [pagamento.appointment_id, pagamento.amount, pagamento.payment_method, pagamento.status, pagamento.transaction_date], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM pagamentos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM pagamentos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    update: (id, pagamento, callback) => {
        const query = 'UPDATE pagamentos SET appointment_id = ?, amount = ?, payment_method = ?, status = ?, transaction_date = ? WHERE id = ?';
        db.query(query, [pagamento.appointment_id, pagamento.amount, pagamento.payment_method, pagamento.status, pagamento.transaction_date, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM pagamentos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Pagamentos;
