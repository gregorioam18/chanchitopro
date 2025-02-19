const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController.js');

router.get('/getAll', categoriasController.getAllCategories);
router.get('/getById/:id', categoriasController.getCategoryById);
router.post('/crear', categoriasController.createCategory);
router.put('/actualizar', categoriasController.updateCategory);
router.delete('/eliminar', categoriasController.deleteCategory);

module.exports = router;