const mysql = require("mysql2");
require("dotenv").config();

// Configuración de la conexión
const connection = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASS ,
  database: process.env.DB_NAME
});

// Conexión
connection.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL correctamente");
});

module.exports = connection;
