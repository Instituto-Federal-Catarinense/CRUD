const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se que exporta uma instância do Sequelize

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
    categoriaId: { // FK para Categoria
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'id'
        },
        field: 'categoria' // Se o campo na tabela for 'categoria'
    }
}, {
    tableName: 'produtos',
    timestamps: false
});

// Associação (relacionamento)
const Categoria = require('./categoriaModel');
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = Produto;