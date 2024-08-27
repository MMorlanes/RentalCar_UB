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

exports.reserveCar = async (carId, startDate, endDate, userId) => {
    const getIdrQuery = `
        SELECT idr 
        FROM UbCoches 
        WHERE idCoches = @carId;
    `;

    const insertQuery = `
        UPDATE UbCoches
        SET idr = @idr, idus = @userId, fecha = @startDate, fechafin = @endDate
        WHERE idCoches = @carId;
    `;

    const updateQuery = `
        UPDATE UbRecursos
        SET status = 'ocupado', fstatus = GETDATE()
        WHERE idr = @idr;
    `;

    try {
        const pool = await sql.globalConnection;
        const transaction = new sql.Transaction(pool);

        await transaction.begin();

        const result = await transaction.request()
            .input('carId', sql.Int, carId)
            .query(getIdrQuery);

        if (result.recordset.length === 0) {
            throw new Error('No se encontró el coche con el ID especificado.');
        }

        const idr = result.recordset[0].idr;

        await transaction.request()
            .input('idr', sql.Int, idr)
            .input('userId', sql.Int, userId)
            .input('startDate', sql.DateTime, new Date(startDate))
            .input('endDate', sql.DateTime, new Date(endDate))
            .input('carId', sql.Int, carId)
            .query(insertQuery);

        await transaction.request()
            .input('idr', sql.Int, idr)
            .query(updateQuery);

        await transaction.commit();
    } catch (err) {
        console.error('Error al realizar la reserva:', err.message);
        throw new Error('Error al realizar la reserva');
    }
};
