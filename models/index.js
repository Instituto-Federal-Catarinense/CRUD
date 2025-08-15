const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Categoria = require('./categoria')(sequelize, Sequelize.DataTypes);
db.Cor = require('./cor')(sequelize, Sequelize.DataTypes);
db.Produto = require('./produto')(sequelize, Sequelize.DataTypes);
db.Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize.sync({ alter: true })
  .then(() => console.log('🛠️ Tabelas sincronizadas com Sequelize.'))
  .catch((err) => console.error('Erro ao sincronizar tabelas:', err));

module.exports = db;
