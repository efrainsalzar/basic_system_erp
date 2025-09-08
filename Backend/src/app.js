const express = require("express");
const cors = require("cors");
//const db = require("./config/db");
const userRoutes = require("./routes/userRouter");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de prueba
app.use("/", userRoutes);

module.exports = app;
