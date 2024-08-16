const loginModel = require('../models/loginModel');

exports.login = (req, res) => {
    const { username, password } = req.body;
    
    loginModel.findUserByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error del servidor' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        return res.json({ message: 'Inicio de sesión exitoso' });
    });
};
