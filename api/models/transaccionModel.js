// api/models/transaccionModel.js
const connection = require('../config/db');

const Transaccion = {
    agregar: (datos, callback) => {
        const query = 'INSERT INTO transacciones (usuario_id, categoria_id, tipo, monto, descripcion, fecha) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [datos.usuario_id, datos.categoria_id, datos.tipo, datos.monto, datos.descripcion, datos.fecha], callback);
    },
    obtenerTodas: (callback) => {
        const query = 'SELECT * FROM transacciones';
        connection.query(query, callback);
    }
};

module.exports = Transaccion;