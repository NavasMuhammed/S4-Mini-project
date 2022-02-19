var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    database:'nodejs',
    user: 'root',
    password: ''
});

connection.connect();

module.exports = connection;