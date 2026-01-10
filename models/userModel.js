const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Conexão com o banco

// Definindo o modelo User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users', // Nome da tabela no banco de dados
    timestamps: false // Desabilitando os campos de timestamps
});

module.exports = User;
