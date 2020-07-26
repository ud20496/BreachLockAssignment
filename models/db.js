const mysql = require("mysql");
const dbConfig = require('../config/db.config');

var connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database
});

module.exports = connection;