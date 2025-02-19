const connection = require('../config/db.js');

const Transaccion = {
    agregar: (datos, callback) => {
        if (!Array.isArray(datos)) {
            return callback(new Error("Los datos deben ser un array de transacciones"));
        }

        const query = `
            INSERT INTO transacciones (usuario_id, categoria_id, tipo, monto, descripcion, fecha) 
            VALUES ?
        `;

        const values = datos.map(t => [t.usuario_id, t.categoria_id, t.tipo, t.monto, t.descripcion, t.fecha]);

        connection.query(query, [values], callback);
    },

    obtenerTodas: (callback) => {
        const query = 'SELECT * FROM transacciones';
        connection.query(query, callback);
    },

    obtenerSaldoTotal: (callback) => {
        const query = `
            SELECT 
                COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END), 0) - 
                COALESCE(SUM(CASE WHEN tipo = 'egreso' THEN monto ELSE 0 END), 0) AS saldo_total
            FROM transacciones;
        `;
        connection.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0].saldo_total || 0);
        });
    }
    
};

module.exports = Transaccion;
