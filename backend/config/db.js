// backend/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Optional: You can test the connection to ensure it works
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');

    // Release the connection back to the pool
    connection.release();
});

// Export the pool wrapped with promise for async/await support
module.exports = pool.promise();
