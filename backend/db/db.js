const sql = require('mssql');
const { connectDB } = require('../config/dbconfig');

let pool;

const connectToDatabase = async () => {
    try {
        pool = await connectDB();
        sql.globalConnection = pool; // Guardar la conexión global
        console.log('Connected to the database successfully.');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        throw err;
    }
};

const getDbConnection = () => {
    if (!pool) {
        throw new Error('Database connection has not been established.');
    }
    return pool;
};

module.exports = {
    connectToDatabase,
    getDbConnection
};
