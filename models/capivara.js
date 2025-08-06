const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Capivara = sequelize.define('Capivara', {
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
    }
}, {
    tableName: 'capivara',
    timestamps: false
});

module.exports = Capivara;