const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./categoriaModel'); // Importe o modelo de Categoria

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
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  // 💡 CHAVE ESTRANGEIRA CORRIGIDA
  // Definimos a coluna 'categoria' explicitamente
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false, // É obrigatório ter uma categoria
    references: {
      model: Categoria, // Referencia o modelo Categoria
      key: 'id' // Usa o campo 'id' do modelo Categoria
    }
  }
}, {
  tableName: 'produtos',
  timestamps: false,
});

// A associação continua a mesma, mas agora o Sequelize já sabe que a coluna `categoria`
// no modelo `Produto` é a chave estrangeira.
Produto.belongsTo(Categoria, {
  foreignKey: 'categoria',
  as: 'categoriaDetalhes'
});

module.exports = Produto;