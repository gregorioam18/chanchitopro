const db = require('../config/db');

const Usuario = {
    obtenerTodos: (callback) => {
        db.query('SELECT * FROM usuarios', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    obtenerPorId: (id, callback) => {
        db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
        });
    },

    crear: (nuevoUsuario, callback) => {
        const { nombre, email, contraseña } = nuevoUsuario;
        console.log('Datos para crear usuario:', { nombre, email, contraseña });
        db.query('INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)',
            [nombre, email, contraseña], (err, results) => {
                if (err) {
                    console.error('Error en la consulta SQL:', err);
                    return callback(err, null);
                }
                callback(null, { id: results.insertId, ...nuevoUsuario });
            });
    },

    actualizar: (id, datosActualizados, callback) => {
        const { nombre, email, contraseña } = datosActualizados;
        db.query('UPDATE usuarios SET nombre = ?, email = ?, contraseña = ? WHERE id = ?',
            [nombre, email, contraseña, id], (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            });
    },

    eliminar: (id, callback) => {
        db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Usuario;
