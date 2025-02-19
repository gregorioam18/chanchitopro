const Categorias = require('../models/categoriasModel.js');

//Obtener todas las categorias
const getAllCategories = async (req, res) => {
    try {
        const categorias = await Categorias.getAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener las categorias', error});
    }
};

//Obtener una categoria por ID
const getCategoryById = async (req, res) => {
    try {
        const categoria = await Categorias.getById(req.params.id);
        if(!categoria) {
            return res.status(400).json({message: 'Categoria no encontrada'});
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener la categoria', error});
    }
};

//Crear una nueva categoria
const createCategory = async (req, res) => {
    try {
        const { nombre } = req.body;
        if(!nombre) {
            return res.status(400).json({message: 'El nombre de la categoria es requerido'});
        }
        const newCategoryId = await Categorias.create(nombre);
        res.status(201).json({id: newCategoryId, nombre});
    } catch (error) {
        res.status(500).json({message: 'Error al crear la categoria', error});
    }
};

//Actualizar una categoria
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        if(!nombre){
            return res.status(400).json({message: 'El nombre de la categoria es requerido'});
        }
        await Categorias.update(id, nombre);
        res.status(200).json({id, nombre});
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar la categoria', error});
    }
};

//Eliminar una categoria
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Categorias.delete(id);
        res.status(200).json({message: 'Categoria eliminada correctamente'});
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar la categoria', error});
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};