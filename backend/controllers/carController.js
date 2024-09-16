const carModel = require('../models/carModel');
const sql = global.sql;

exports.getAvailableCars = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        await carModel.updateCarStatus(); // Actualiza los estados de los coches
        const cars = await carModel.getAvailableCars(startDate, endDate);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los coches disponibles', error: error.message });
    }
};

exports.reserveCar = async (req, res) => {
    const carId = req.params.id;
    const { startDate, endDate, comments } = req.body;
    const userEmail = req.body.email;  // Asegúrate de que el correo electrónico del usuario autenticado sea parte de la solicitud

    // Formatear las fechas para SQL
    const formattedStartDate = new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
    const formattedEndDate = new Date(endDate).toISOString().slice(0, 19).replace('T', ' ');

    try {
        // Obtener el userId desde la tabla UbUserweb basado en el correo electrónico
        const pool = await sql.globalConnection;
        const userQuery = `SELECT id FROM UbUserweb WHERE mail = @userEmail`;

        const userResult = await pool.request()
            .input('userEmail', sql.NVarChar, userEmail)
            .query(userQuery);

        if (userResult.recordset.length === 0) {
            return res.status(404).json({ message: 'No se encontró el usuario con ese correo electrónico.' });
        }

        const userId = userResult.recordset[0].id;

        // Mostrar en consola lo que se está recibiendo
        console.log('Reserva recibida:');
        console.log('Car ID:', carId);
        console.log('Start Date:', formattedStartDate);
        console.log('End Date:', formattedEndDate);
        console.log('Comments:', comments);
        console.log('User ID:', userId);

        // Proceder a la reserva
        await carModel.reserveCar(carId, formattedStartDate, formattedEndDate, userId, comments);
        res.json({ message: 'Coche reservado exitosamente' });
    } catch (error) {
        console.error('Error al realizar la reserva:', error.message);
        res.status(500).json({ message: 'Error al reservar el coche', error: error.message });
    }
};
