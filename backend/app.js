require('./config/globals'); // Esto hará que todo lo definido en globals.js sea global

const express = require('express');
const applyMiddleware = require('./middleware');
const routes = require('./routes');
const { connectToDatabase } = require('./db/db');

const app = express();

// Aplicar los middleware
applyMiddleware(app);

// Conectar a la base de datos
connectToDatabase().then(() => {
    // Configurar las rutas
    app.use('/api', routes);

    // Iniciar el servidor
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.error('Failed to start the server due to database connection error:', err);
});
