const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccionController');

// Ruta para agregar una transacción
router.post('/', transaccionController.agregarTransaccion);

// Ruta para obtener todas las transacciones
router.get('/', transaccionController.obtenerTransacciones);

// Ruta para obtener el saldo total
router.get('/saldo', transaccionController.obtenerSaldoTotal);

// Ruta para obtener todas las transacciones ordenadas por fecha
router.get('/ordenadas', transaccionController.obtenerTransaccionesOrdenadas);

module.exports = router;
