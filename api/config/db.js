// api/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Cambia esto si usas otro usuario
    password: '',       // Cambia esto si tienes contraseña
    database: 'chanchitoprobd'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la BD:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;