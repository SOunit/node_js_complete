const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'rootPassword', {
  dialect: 'mysql',
  host: 'mysql_host',
});

module.exports = sequelize;
