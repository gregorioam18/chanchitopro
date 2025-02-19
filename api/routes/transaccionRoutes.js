const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccionController');

// Ruta para agregar una transacción
router.post('/', transaccionController.agregarTransaccion);

// Ruta para obtener todas las transacciones
router.get('/', transaccionController.obtenerTransacciones);

// Ruta para obtener el saldo total
router.get('/saldo', transaccionController.obtenerSaldoTotal);

module.exports = router;
