const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de validación de cédulas',
        endpoints: {
            'GET /api/validate?cedula={cedula}': 'Validar una cédula usando el método GET'
        }
    });
});

app.use('/api', require('./api/validate'));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});