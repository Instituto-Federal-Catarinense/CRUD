const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cor = sequelize.define('Cor', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'cores',  // nome da tabela no banco
    timestamps: false    // sem createdAt e updatedAt
});

module.exports = Cor;
