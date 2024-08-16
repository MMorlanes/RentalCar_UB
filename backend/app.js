const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const carRoutes = require('./routes/carRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use('/api/cars', carRoutes);
app.use('/api', loginRoutes);

// Servir archivos estáticos desde la carpeta frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Ruta para index.html
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

app.get('/api/check-db-connection', (req, res) => {
    const sql = require('./db');
    sql.connect().then(pool => {
        if (pool.connected) {
            res.json({ message: 'Conexión a la base de datos exitosa' });
        }
    }).catch(err => {
        res.status(500).json({ message: 'Error al conectar a la base de datos', error: err });
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
