const mysql = require('mysql2/promise')
const pool = mysql.createPool({
  host: process.env.DB_HOST,
	port: process.env.DB_PORT, // mysql2는 3306 port로 접근해서 생략가능
  user: process.env.DB_USER, 
	password: process.env.DB_PASS,
  database: process.env.DB_NAME,
	waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {pool}
