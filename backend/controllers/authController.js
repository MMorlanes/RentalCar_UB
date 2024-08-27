exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona un correo y contraseña.' });
    }

    const pool = sql.globalConnection; // Usando sql globalmente
    
    pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM UbUsersweb WHERE username = @email', (err, result) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error del servidor' });
            }

            if (result.recordset.length === 0) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }

            const user = result.recordset[0];
            
            if (user.password === password) {
                return res.status(200).json({ message: 'Login exitoso' });
            } else {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }
        });
};
