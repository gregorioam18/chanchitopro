const express = require('express');
const cors = require('cors');

const transaccionRoutes = require('./routes/transaccionRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');

const app = express();
const port = 3000;

// 🔹 Configurar CORS para permitir solo el frontend en localhost
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🔹 Middleware para procesar JSON
app.use(express.json());

// 🔹 Rutas
app.use('/api/transacciones', transaccionRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/categorias', categoriasRoutes);

// 🔹 Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// 🔹 Manejo de errores generales
app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err);
    res.status(500).json({ error: 'Error en el servidor' });
});

// 🔹 Iniciar el servidor
app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
    console.log('📌 Rutas activas:');
    console.log('- GET/POST/PUT/DELETE → /api/transacciones');
    console.log('- GET/POST/PUT/DELETE → /api/usuarios');
    console.log('- GET/POST/PUT/DELETE → /api/categorias');
});
