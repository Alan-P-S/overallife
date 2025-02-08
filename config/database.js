const mysql = require('mysql2');
require('dotenv').config();
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:  process.env.DB_PASS,
    database:  process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});


db.getConnection((err,connection)=>{
    if (err) {
        console.log("Database connection error: ",err);
    }
    else{
        console.log("Database connected");
        connection.release();
    }
})


module.exports = db;