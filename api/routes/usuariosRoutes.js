const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

console.log('usuariosController:', usuariosController);

router.get('/', usuariosController.obtenerUsuarios);
router.get('/:id', usuariosController.obtenerUsuarioPorId);
router.post('/crear', usuariosController.crearUsuario);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);
router.post('/login', usuariosController.loginUsuario);

module.exports = router;
