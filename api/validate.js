const express = require('express');
const router = express.Router();

function validateCedula(cedula) {
    if (!/^\d+$/.test(cedula) || cedula.length !== 11) {
        return false;
    }

    const digitoVerificador = parseInt(cedula[10], 10);

    let suma1 = 0;
    let suma2 = 0;

    for (let num = 9; num >= 0; num--) {
        const digito = parseInt(cedula[num], 10);

        if (num % 2 !== 0) {
            if (digito * 2 >= 10) {
                suma1 += (digito * 2) - 9;
            } else {
                suma1 += digito * 2;
            }
        } else {
            suma2 += digito;
        }
    }

    const sumaTotal = suma1 + suma2;

    const modulo = (sumaTotal % 10 !== 0) ? (10 - (sumaTotal % 10)) : 0;

    return modulo === digitoVerificador;
}

router.get('/validate', (req, res) => {
    const { cedula } = req.query;

    if (!cedula) {
        return res.status(400).json({ error: 'No se proporcionó una cédula' });
    }

    const isValid = validateCedula(cedula);

    if (isValid) {
        res.json({
            cedula,
            isValid,
            message: 'Cédula Válida'
        });
    } else {
        res.json({
            cedula,
            isValid,
            error: 'Cédula inválida: debe contener 11 dígitos numéricos.'
        });
    }
});

module.exports = router;