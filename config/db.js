const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize('crud', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the MySQL database.');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = sequelize;
