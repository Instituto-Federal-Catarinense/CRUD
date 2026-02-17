const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuarios = sequelize.define('Usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuariosname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garantir que o nome de usuário seja único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'usuarios',
  timestamps: false, // Desativando campos createdAt/updatedAt se não forem necessários
});

// Se você precisar de autenticação ou métodos adicionais, pode adicionar aqui!

module.exports = Usuarios;
