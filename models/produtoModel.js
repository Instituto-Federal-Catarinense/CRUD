const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
  categoriaId: { // referência à chave estrangeira
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias', // nome da tabela no banco (não o model)
      key: 'id'
    }
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

module.exports = Produto;
