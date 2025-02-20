const Transaccion = require('../models/transaccionModel');

const agregarTransaccion = (req, res) => {
    const datos = req.body;

    if (!Array.isArray(datos) || datos.length === 0) {
        return res.status(400).json({ error: "El cuerpo de la solicitud debe ser un array de transacciones" });
    }

    console.log('Datos recibidos:', datos);

    Transaccion.agregar(datos, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Transacciones agregadas correctamente" });
    });
};

const obtenerTransacciones = (req, res) => {
    Transaccion.obtenerTodas((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

const obtenerSaldoTotal = (req, res) => {
    Transaccion.obtenerSaldoTotal((err, saldo) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ saldo_total: saldo });
    });
};

const obtenerTransaccionesOrdenadas = (req, res) => {
    Transaccion.obtenerTodasOrdenadas((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

module.exports = {
    agregarTransaccion,
    obtenerTransacciones,
    obtenerSaldoTotal,
    obtenerTransaccionesOrdenadas
};
