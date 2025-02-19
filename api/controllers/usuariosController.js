const Usuario = require('../models/usuariosModel');

const obtenerUsuarios = (req, res) => {
    Usuario.obtenerTodos((err, usuarios) => {
        if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
        res.json(usuarios);
    });
};

const obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    Usuario.obtenerPorId(id, (err, usuario) => {
        if (err) return res.status(500).json({ error: 'Error al obtener usuario' });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    });
};

const crearUsuario = (req, res) => {
    console.log('Headers:', req.headers);  // Verifica los encabezados de la solicitud
    console.log('Cuerpo de la solicitud:', req.body);  // Verifica qué datos están llegando
    const nuevoUsuario = req.body;
    console.log('Datos recibidos:', nuevoUsuario);
    
    // Verificar que el objeto tiene los datos correctos
    if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.contraseña) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Proceder con la creación del usuario
    Usuario.crear(nuevoUsuario, (err, usuarioCreado) => {
        if (err) {
            console.error('Error en crearUsuario:', err);
            return res.status(500).json({ error: 'Error al crear usuario' });
        }
        res.status(201).json(usuarioCreado);
    });
};


const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    Usuario.actualizar(id, datosActualizados, (err, resultado) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
        res.json({ mensaje: 'Usuario actualizado correctamente' });
    });
};

const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    Usuario.eliminar(id, (err, resultado) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    });
};

module.exports = { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario };
