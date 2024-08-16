const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt instalado para la comparación segura de contraseñas
const userModel = require('../models/userModel'); // Ajusta la ruta a tu modelo de usuario

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    userModel.findUserByUsername(email, (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }

        if (!user) { // Si el usuario no existe
            return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }

        // Comparar la contraseña usando bcrypt
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error en el servidor' });
            }

            if (!isMatch) { // Si las contraseñas no coinciden
                return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
            }

            // Si la autenticación es exitosa, redirige al usuario a index.html
            res.json({ success: true });
        });
    });
});

module.exports = router;
