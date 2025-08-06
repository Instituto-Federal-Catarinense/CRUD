const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Corrigido para corresponder aos nomes dos arquivos de modelo
db.Categoria = require('./categoriaModel')(sequelize, Sequelize.DataTypes);
db.Cor = require('./corModel')(sequelize, Sequelize.DataTypes);
db.Produto = require('./produtoModel')(sequelize, Sequelize.DataTypes);
db.Usuario = require('./usuarioModel')(sequelize, Sequelize.DataTypes);
// Caso tenha um modelo de Venda, adicione também
// db.Venda = require('./vendaModel')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize.sync({ alter: true })
  .then(() => console.log('🛠️ Tabelas sincronizadas com Sequelize.'))
  .catch((err) => console.error('Erro ao sincronizar tabelas:', err));

module.exports = db;
