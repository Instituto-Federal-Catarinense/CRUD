const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // ajuste conforme seu arquivo de conexão

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categorias',
      key: 'id'
    }
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

module.exports = Produto;
