const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true, // Importante para conexiones a Azure
        trustServerCertificate: false, // Cambiar a true si el certificado del servidor no es confiable
    }
};

async function connectDB() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed: ', err);
        throw err;
    }
}

module.exports = { connectDB };
