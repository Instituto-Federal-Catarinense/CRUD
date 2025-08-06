const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'categoria'
    }
}, {
    tableName: 'produtos',
    timestamps: false // 🔧 importante para evitar erro com createdAt e updatedAt
});

module.exports = Produto;
