const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // ajuste se necessário

const Usuarios = sequelize.define('Usuarios', {
    usuariosname: {
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
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuarios;
