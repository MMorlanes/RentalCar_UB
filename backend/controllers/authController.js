const userModel = require('../models/userModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona un correo y contraseña.' });
    }

    try {
        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        if (user.password === password) {
            // Enviar el PkUserWeb al frontend
            return res.status(200).json({ message: 'Login exitoso', PkUserWeb: user.PkUserWeb });
        } else {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error en el proceso de login:', error.message);
        return res.status(500).json({ message: 'Error del servidor' });
    }
};
