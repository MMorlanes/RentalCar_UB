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
    const { startDate, endDate, comments, PkUserWeb } = req.body;  // Usamos PkUserWeb

    // Formatear las fechas para SQL Server
    const formattedStartDate = new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
    const formattedEndDate = new Date(endDate).toISOString().slice(0, 19).replace('T', ' ');

    try {
        console.log('Reserva recibida:');
        console.log('Car ID:', carId);
        console.log('Start Date:', formattedStartDate);
        console.log('End Date:', formattedEndDate);
        console.log('Comments:', comments);
        console.log('PkUserWeb:', PkUserWeb);  // Mostramos el valor de PkUserWeb

        // Proceder a la reserva usando PkUserWeb
        await carModel.reserveCar(carId, formattedStartDate, formattedEndDate, PkUserWeb, comments);
        res.json({ message: 'Coche reservado exitosamente' });
    } catch (error) {
        console.error('Error al realizar la reserva:', error.message);
        res.status(500).json({ message: 'Error al reservar el coche', error: error.message });
    }
};
