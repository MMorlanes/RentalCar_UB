const sql = global.sql;

exports.findUserByEmail = async (email) => {
    const query = 'SELECT * FROM UbUsersweb WHERE username = @Email';  // 'username' es la columna correcta para el correo

    try {
        const pool = await sql.globalConnection;
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query(query);

        if (result.recordset.length === 0) {
            return null; // Usuario no encontrado
        }

        // Retorna el 'PkUserWeb'
        return {
            PkUserWeb: result.recordset[0].PkUserWeb,  // Cambiado a 'PkUserWeb'
            ...result.recordset[0]  // Retorna el resto de la información del usuario
        };
    } catch (error) {
        console.error('Error al buscar el usuario por email:', error.message);
        throw new Error('Error al buscar el usuario');
    }
};
