const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'produtos',
  timestamps: false,
});

const Categoria = require('./categoriaModel');
const Cor = require('./corModel');

Produto.belongsTo(Categoria, { foreignKey: 'categoria', as: 'categoriaInfo' });
Produto.belongsTo(Cor, { foreignKey: 'cor_id', as: 'corInfo' });

module.exports = Produto;

