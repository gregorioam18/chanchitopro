// api/routes/transaccionRoutes.js
const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccionController');

// Ruta para agregar una transacción
router.post('/', transaccionController.agregarTransaccion);

// Ruta para obtener todas las transacciones
router.get('/', transaccionController.obtenerTransacciones);

module.exports = router;