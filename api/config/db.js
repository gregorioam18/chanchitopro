const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Si tenés contraseña, ponela acá
    database: 'chanchitoprodb'
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a la BD:', err);
    } else {
        console.log('✅ Conectado a la base de datos');
    }
});

module.exports = connection;
