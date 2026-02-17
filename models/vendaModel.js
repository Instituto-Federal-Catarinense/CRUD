const db = require('../config/db');

const Venda = {
  create: (venda, callback) => {
    const query = 'INSERT INTO vendas (data, valor, quantidade, produto_id) VALUES (?, ?, ?, ?)';
    db.query(query, [venda.data, venda.valor, venda.quantidade, venda.produto_id], (err, results) => {
      if (err) return callback(err);
      callback(null, results.insertId);
    });
  },

  findById: (id, callback) => {
    const query = `
      SELECT vendas.*, produtos.nome AS nome_produto
      FROM vendas
      JOIN produtos ON vendas.produto_id = produtos.id
      WHERE vendas.id = ?
    `;
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  getAll: (callback) => {
    const query = `
      SELECT vendas.*, produtos.nome AS nome_produto
      FROM vendas
      JOIN produtos ON vendas.produto_id = produtos.id
    `;
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  update: (id, venda, callback) => {
    const query = 'UPDATE vendas SET data = ?, valor = ?, quantidade = ?, produto_id = ? WHERE id = ?';
    db.query(query, [venda.data, venda.valor, venda.quantidade, venda.produto_id, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM vendas WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

Categoria.findById(id, (err, categoria) => {
  if (err) return res.status(500).json(err);
  res.json(categoria);
});

module.exports = Venda;
