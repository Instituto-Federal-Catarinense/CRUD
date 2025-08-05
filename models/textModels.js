const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se que exporta uma instância do Sequelize

const Text = sequelize.define('Text', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'text',
    timestamps: false
});

module.exports = Text;