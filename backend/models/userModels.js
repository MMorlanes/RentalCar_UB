const sql = require('mssql');

// Configuración de la conexión a la base de datos
const dbConfig = {
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
sql.connect(dbConfig).catch(err => console.error('Error al conectar a la base de datos:', err));

// Buscar usuario por nombre de usuario (o email en este caso)
exports.findUserByUsername = (email, callback) => {
    const request = new sql.Request();
    request.input('email', sql.VarChar, email);
    request.query('SELECT * FROM UbUsersweb WHERE username = @email', (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return callback(err, null);
        }

        if (result.recordset.length > 0) {
            // Usuario encontrado
            return callback(null, result.recordset[0]);
        } else {
            // Usuario no encontrado
            return callback(null, null);
        }
    });
};
