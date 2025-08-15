const Categoria = require('./categoriaModel');
const Produto = require('./produtoModel');
const Fornecedor = require('./fornecedorModel');
const Usuario = require('./usuarioModel');


Categoria.hasMany(Produto, { foreignKey: 'categoriaId' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Fornecedor.hasMany(Produto, { foreignKey: 'fornecedorId' });
Produto.belongsTo(Fornecedor, { foreignKey: 'fornecedorId' });

// Se houver outros relacionamentos, mantenha apenas os necessários

module.exports = {
  Categoria,
  Produto,
  Fornecedor,
  Usuario,
};