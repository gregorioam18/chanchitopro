const express = require('express');
const NotasController = require('../controllers/notasController');

const router = express.Router();

router.post('/', NotasController.crearNota);
router.get('/', NotasController.obtenerNotas);
router.patch('/:id/completar', NotasController.completarTarea);
router.delete('/:id', NotasController.borrarNota); // Nueva ruta para borrar notas

module.exports = router;
