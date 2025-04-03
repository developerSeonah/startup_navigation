const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '1234',
  database: 'startup_navigation_db',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;