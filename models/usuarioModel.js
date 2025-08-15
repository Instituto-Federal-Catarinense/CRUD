module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    usuarioname: {
      type: DataTypes.STRING,
      allowNull: false,
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
    timestamps: false
  });

  return Usuario;
};
