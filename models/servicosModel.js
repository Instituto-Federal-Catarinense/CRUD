const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Servicos extends Model {
  static associate(models) {
    Servicos.belongsTo(models.Categoria, {
      foreignKey: 'categoria',  // nome da chave estrangeira no banco
      as: 'categoriaServico',
    });
  }
}

Servicos.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias',  // nome da tabela que referencia
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Servicos',
  tableName: 'servicos',
  timestamps: true,
});

module.exports = Servicos;
