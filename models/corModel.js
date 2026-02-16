module.exports = (sequelize, DataTypes) => {
  const Cor = sequelize.define('Cor', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'cor',
    timestamps: false
  });

  return Cor;
};
