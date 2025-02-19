const express = require('express');
const app = express();
const transaccionRoutes = require('./routes/transaccionRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const port = 3000;

app.use(express.json());

app.use('/api/transacciones', transaccionRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/categorias', categoriasRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
