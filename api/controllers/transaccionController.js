// api/controllers/transaccionController.js
const Transaccion = require('../models/transaccionModel');

exports.agregarTransaccion = (req, res) => {
    const datos = req.body;
    Transaccion.agregar(datos, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.obtenerTransacciones = (req, res) => {
    Transaccion.obtenerTodas((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};