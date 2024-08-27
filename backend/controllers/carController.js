const carModel = require('../models/carModel');

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
    const { startDate, endDate } = req.body;
    const userId = req.userId; // Suponemos que el ID del usuario está almacenado en `req.userId`

    try {
        await carModel.reserveCar(carId, startDate, endDate, userId);
        res.json({ message: 'Coche reservado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al reservar el coche', error: error.message });
    }
};
