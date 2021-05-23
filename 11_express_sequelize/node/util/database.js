const mysql = require('mysql2');

// pool offer automatic open and close db connection
const pool = mysql.createPool({
  host: 'mysql_host',
  database: 'node-complete',
  user: 'root',
  password: 'rootPassword',
});

module.exports = pool.promise();
