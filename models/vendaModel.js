const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Conexão com o banco
const Produto = require('./produtoModel'); // Importa o modelo de Produto

// Definindo o modelo Venda
const Venda = sequelize.define('Venda', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Produto, // Relaciona a venda com o produto
      key: 'id'
    },
    allowNull: false,
  },
}, {
  tableName: 'vendas', // Nome da tabela no banco
  timestamps: false,   // Desabilita a criação automática dos campos `createdAt` e `updatedAt`
});

// Definindo a associação entre Venda e Produto
Venda.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });

module.exports = Venda;
