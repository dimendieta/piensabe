const mysql = require('mysql2');

class Database {
  getConnection() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'admin123',
      database: 'universidadU'
    });
    return connection;
  }

}
module.exports = Database;


