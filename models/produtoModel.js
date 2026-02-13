const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoriaModel');
const Tempo = require('./tempoModel');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'id'
    }
  },
  tempo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tempo,
      key: 'id'
    }
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

// Associações com alias corretos
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
Produto.belongsTo(Tempo, { foreignKey: 'tempo_id', as: 'tempo' });

module.exports = Produto;