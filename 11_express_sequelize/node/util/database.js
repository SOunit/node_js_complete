const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'example', {
  dialect: 'mysql',
  host: 'mysql_host',
});

module.exports = sequelize;
