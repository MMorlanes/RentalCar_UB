const sql = require('mssql');

// Configuración de la base de datos
const config = {
    user: 'ubadmin',
    password: 'EZFRsuw$QowTrYoV',
    server: 'ubserveraz.database.windows.net',
    database: 'UbHR',
    options: {
        encrypt: true, // Si estás utilizando Azure
        trustServerCertificate: true // Si es necesario
    }
};

// Conectar a la base de datos
sql.connect(config).then(pool => {
    if (pool.connected) {
        console.log('Conectado a la base de datos.');
    }
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});

module.exports = sql;
