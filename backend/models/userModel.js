const sql = global.sql; // Usando la conexión SQL global

exports.findUserByEmail = async (email) => {
    const query = 'SELECT * FROM UbUsersweb WHERE username = @Email';

    try {
        const pool = await sql.globalConnection;
        const result = await pool.request()
            .input('Email', sql.VarChar, email)
            .query(query);

        if (result.recordset.length === 0) {
            return null; // Usuario no encontrado
        }

        return result.recordset[0]; // Retorna el usuario encontrado
    } catch (error) {
        console.error('Error al buscar el usuario por email:', error.message);
        throw new Error('Error al buscar el usuario');
    }
};
