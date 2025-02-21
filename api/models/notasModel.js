const NotasModel = require('../models/notasModel');

const NotasController = {
    async crearNota(req, res) {
        try {
            const { usuario_creador_id, usuario_asignado_id, contenido, es_tarea } = req.body;
            const id = await NotasModel.crearNota(usuario_creador_id, usuario_asignado_id, contenido, es_tarea);
            res.status(201).json({ id, mensaje: "Nota/Tarea creada exitosamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async obtenerNotas(req, res) {
        try {
            const notas = await NotasModel.obtenerNotas();
            res.json(notas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async completarTarea(req, res) {
        try {
            const { id } = req.params;
            const resultado = await NotasModel.completarTarea(id);
            if (resultado) {
                res.json({ mensaje: "Tarea completada" });
            } else {
                res.status(404).json({ mensaje: "Tarea no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async borrarNota(req, res) {
        try {
            const { id } = req.params;
            const resultado = await NotasModel.borrarNota(id);
            if (resultado) {
                res.json({ mensaje: "Nota eliminada correctamente" });
            } else {
                res.status(404).json({ mensaje: "Nota no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = NotasController;
