// api/routes/transaccionRoutes.js
const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccionController');

// Ruta para agregar una transacción
router.post('/transacciones', transaccionController.agregarTransaccion);

// Ruta para obtener todas las transacciones
router.get('/transacciones', transaccionController.obtenerTransacciones);

module.exports = router;