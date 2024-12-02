const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',       
    user: 'root',   
    password: 'qwer@tyui@op12@',     
    database: 'final_project' 
});

connection.connect((err) => {
    if (err) {
        console.error('連線到 MySQL 失敗:', err.stack);
        return;
    }
    console.log('已連線到 MySQL 資料庫');
});

module.exports = connection;
