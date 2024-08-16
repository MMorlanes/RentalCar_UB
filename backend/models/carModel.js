const sql = require('../db');

exports.getAvailableCars = async (startDate, endDate) => {
    const query = `
        SELECT DISTINCT UbRecursos.nombre, UbRecursos.tipo, UbCoches.fecha, UbCoches.fechafin
        FROM UbRecursos
        right JOIN UbCoches ON UbRecursos.idr = UbCoches.idr
        WHERE UbRecursos.tipo = 'vehiculo'
        AND UbRecursos.status = 'libre'
    `;

    try {
        const pool = await sql.connect();
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
        const pool = await sql.connect();
        await pool.request().query(query);
    } catch (err) {
        console.error('Error al actualizar estados de coches:', err);
    }
};

exports.reserveCar = async (carId, startDate, endDate, userId) => {
    const getIdrQuery = `
        SELECT idr 
        FROM UbCoches 
        WHERE idCoches = @carId;
    `;

    const insertQuery = `
        UPDATE UbCoches (idr, idus, fecha, fechafin, coment, kms)
        VALUES (@idr, @userId, @startDate, @endDate, NULL, NULL);
    `;

    const updateQuery = `
        UPDATE UbRecursos
        SET status = 'ocupado', fstatus = GETDATE()
        WHERE idr = @idr;
    `;

    try {
        const pool = await sql.connect();
        const transaction = new sql.Transaction(pool);

        await transaction.begin();

        // Primero, obtén el valor de `idr`
        const result = await transaction.request()
            .input('carId', sql.Int, carId)
            .query(getIdrQuery);

        if (result.recordset.length === 0) {
            throw new Error('No se encontró el coche con el ID especificado.');
        }

        const idr = result.recordset[0].idr;

        // Luego, inserta la nueva línea en UbCoches
        await transaction.request()
            .input('idr', sql.Int, idr)
            .input('userId', sql.Int, userId)
            .input('startDate', sql.DateTime, new Date(startDate))
            .input('endDate', sql.DateTime, new Date(endDate))
            .query(insertQuery);

        // Finalmente, actualiza el estado en UbRecursos
        await transaction.request()
            .input('idr', sql.Int, idr)
            .query(updateQuery);

        await transaction.commit();
    } catch (err) {
        console.error('Error al realizar la reserva:', err.message);
        throw new Error('Error al realizar la reserva');
    }
};
