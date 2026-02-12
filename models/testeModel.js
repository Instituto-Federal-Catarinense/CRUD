const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // ajuste se o caminho for diferente

const Teste = sequelize.define('Teste', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'teste',
    timestamps: false
});

module.exports = Teste;
