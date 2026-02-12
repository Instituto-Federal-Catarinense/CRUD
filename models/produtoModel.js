const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Categoria = require('./categoriaModel');

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
            model: Categoria,
            key: 'id'
    }
}

}, {
    tableName: 'produtos',
    timestamps: false
});

Produto.belongsTo(Categoria, {
  foreignKey: 'categoria',  // ou 'categoriaId', conforme seu modelo
  as: 'categoria_info'      // esse é o alias para incluir depois
});

module.exports = Produto;
