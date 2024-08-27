// Importar y configurar módulos globales
global.sql = require('mssql');

// Puedes agregar otros módulos globales aquí si es necesario
// global._ = require('lodash'); // Ejemplo: importar lodash globalmente

// Si tienes alguna configuración global, también puedes agregarla aquí
global.config = {
    // Configuraciones globales, si las necesitas
};

// Si quieres centralizar algunas constantes
global.constants = {
    JWT_SECRET: 'your_secret_key',
    // Otros valores constantes
};
