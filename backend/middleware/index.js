const express = require('express');
const path = require('path');

module.exports = (app) => {
    // Middleware para manejar JSON en el cuerpo de la solicitud
    app.use(express.json());

    // Servir archivos estáticos
    app.use(express.static(path.join(__dirname, '../../frontend/public')));
    app.use('/img', express.static(path.join(__dirname, '../../frontend/img')));
};
