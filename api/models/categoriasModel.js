const connection = require('../config/db.js');

const Categorias = {
    //Obtener todas las categorias
    getAll() {
        const [rows] = db.query('SELECT * FROM categorias');
        return rows;
    },

    //Obtener una categoria por ID
    getById() {
        const [rows] = db.query('SELECT * FROM categorias WHERE id = ?', [id]);
        return rows[0];
    },

    //Crear una nueva categoria
    create(nombre) {
        const [result] = db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
        return result.insertId;
    },

    //Actualizar una categoria
    update(id, nombre) {
        db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
    },

    //Eliminar una categoria
    delete(id) {
        db.query('DELETE FROM categorias WHERE id = ?', [id]);
    }
}
module.exports = Categorias;