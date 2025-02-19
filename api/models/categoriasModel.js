const db = require('../config/db.js').promise(); // <- SOLO ACÁ

const Categorias = {
    // Obtener todas las categorías
    async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM categorias');
            return rows;
        } catch (error) {
            console.error('Error en getAll:', error);
            throw error;
        }
    },

    // Obtener categoría por ID
    async getById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error en getById:', error);
            throw error;
        }
    },

    // Crear nueva categoría
    async create(nombre) {
        try {
            const [result] = await db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
            return result.insertId;
        } catch (error) {
            console.error('Error en create:', error);
            throw error;
        }
    },

    // Actualizar categoría
    async update(id, nombre) {
        try {
            await db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
        } catch (error) {
            console.error('Error en update:', error);
            throw error;
        }
    },

    // Eliminar categoría
    async delete(id) {
        try {
            await db.query('DELETE FROM categorias WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error en delete:', error);
            throw error;
        }
    }
};

module.exports = Categorias;
