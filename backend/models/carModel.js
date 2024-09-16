const sql = global.sql;

exports.getAvailableCars = async (startDate, endDate) => {
    const query = `
        SELECT DISTINCT UbRecursos.nombre, UbRecursos.tipo, UbCoches.fecha, UbCoches.fechafin
        FROM UbRecursos
        RIGHT JOIN UbCoches ON UbRecursos.idr = UbCoches.idr
        WHERE UbRecursos.tipo = 'vehiculo'
        AND UbRecursos.status = 'libre'
    `;

    try {
        const pool = await sql.globalConnection;
        const result = await pool.request()
            .input('startDate', sql.DateTime, new Date(startDate))
            .input('endDate', sql.DateTime, new Date(endDate))
            .query(query);

        return result.recordset;
    } catch (err) {
        throw new Error('Error al obtener los coches disponibles');
    }
};

exports.updateCarStatus = async () => {
    const query = `
        UPDATE UbRecursos
        SET status = 'libre'
        FROM UbRecursos
        JOIN UbCoches ON UbRecursos.idr = UbCoches.idr
        WHERE UbCoches.fechafin < GETDATE()
        AND UbRecursos.status = 'ocupado';
    `;

    try {
        const pool = await sql.globalConnection;
        await pool.request().query(query);
    } catch (err) {
        console.error('Error al actualizar estados de coches:', err);
        throw new Error('Error al actualizar estados de coches');
    }
};

exports.reserveCar = async (carId, startDate, endDate, userId, comments) => {
    const getIdrQuery = `
        SELECT idr 
        FROM UbRecursos 
        WHERE idr = @carId;  // Cambiado de 'idCoches' a 'idr'
    `;

    const insertQuery = `
        UPDATE UbRecursos
        SET idr = @idr, usuario = @userId, fstatus = @startDate, comentarios = @comments, status = 'ocupado'
        WHERE idr = @carId;  // Cambiado de 'idCoches' a 'idr'
    `;

    const updateQuery = `
        UPDATE UbRecursos
        SET status = 'ocupado', fstatus = GETDATE(), usuario = @userId
        WHERE idr = @idr;
    `;

    try {
        const pool = await sql.globalConnection;
        const transaction = new sql.Transaction(pool);

        await transaction.begin();

        // Obtén el 'idr' del coche
        const result = await transaction.request()
            .input('carId', sql.Int, carId)
            .query(getIdrQuery);

        if (result.recordset.length === 0) {
            throw new Error('No se encontró el coche con el ID especificado.');
        }

        const idr = result.recordset[0].idr;

        // Mostrar los datos antes de realizar las consultas
        console.log('Reservando coche con ID:', carId);
        console.log('IDR:', idr);
        console.log('User ID:', userId);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Comments:', comments);

        // Ejecuta la consulta de actualización para reservar el coche
        await transaction.request()
            .input('idr', sql.Int, idr)
            .input('userId', sql.Int, userId)
            .input('startDate', sql.DateTime, new Date(startDate))
            .input('endDate', sql.DateTime, new Date(endDate))
            .input('comments', sql.NVarChar, comments)
            .query(insertQuery);

        await transaction.commit();
    } catch (err) {
        console.error('Error al realizar la reserva:', err.message);
        throw new Error('Error al realizar la reserva');
    }
};