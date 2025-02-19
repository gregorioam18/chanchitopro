// api/server.js
const express = require('express');
const app = express();
const transaccionRoutes = require('./routes/transaccionRoutes');
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de transacciones
app.use('/api', transaccionRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});