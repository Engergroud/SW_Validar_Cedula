const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 10000;

// Configurar CORS para permitir solicitudes desde tu origen específico
const corsOptions = {
    origin: 'https://engergroud.github.io'
};

app.use(cors(corsOptions)); // Habilita CORS con las opciones especificadas

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