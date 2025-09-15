const express = require("express");
const cors = require("cors");
//const db = require("./config/db");
const userRoutes = require("./routes/userRouter");
const clientRoutes = require("./routes/clientRouter");
const proveedorRoutes = require("./routes/proveedorRouter");
const productRoutes = require("./routes/productRouter");
const comprastRoutes = require("./routes/compraRouter");
const detalleCompraRoutes = require("./routes/detalleCompraRouter");
const ventaRoutes = require("./routes/ventaRouter");
const detalleVentaRoutes = require("./routes/detalleVentaRouter");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de prueba
app.use("/", userRoutes);
app.use("/", clientRoutes);
app.use("/", proveedorRoutes);
app.use("/", productRoutes);
app.use("/", comprastRoutes);
app.use("/", detalleCompraRoutes);
app.use("/", ventaRoutes);
app.use("/", detalleVentaRoutes);

module.exports = app;
