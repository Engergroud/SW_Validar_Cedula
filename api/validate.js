const express = require('express');
const router = express.Router();

function validateCedula(cedula) {
    // Verificar si la cédula está vacía, es null o undefined
    if (!cedula) {
        return { isValid: false, error: 'No se proporcionó una cédula' };
    }

    // Verificar si la cédula contiene letras
    if (!/^\d+$/.test(cedula)) {
        return { isValid: false, error: 'La cédula contiene caracteres no numéricos' };
    }

    // Verificar si la cédula tiene exactamente 11 dígitos
    if (cedula.length !== 11) {
        return { isValid: false, error: 'La cédula debe contener 11 dígitos numéricos' };
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

    const isValid = modulo === digitoVerificador;

    if (!isValid) {
        return { isValid: false, error: 'Cédula inválida' };
    }

    return { isValid: true, message: 'Cédula Válida' };
}

router.get('/validate', (req, res) => {
    const { cedula } = req.query;

    const validationResult = validateCedula(cedula);

    res.json({
        cedula,
        isValid: validationResult.isValid,
        message: validationResult.message || validationResult.error
    });
});

module.exports = router;