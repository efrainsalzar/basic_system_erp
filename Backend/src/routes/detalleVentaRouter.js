const express = require("express");
const detalle_ventas = require("../controllers/detalleVentaController");

const router = express.Router();

//router.get("/detalle_ventas", detalle_ventas.getDetallesByCompraId);
router.get("/detalle_ventas/:id", detalle_ventas.getDetallesByVentaId);
router.post("/detalle_ventas", detalle_ventas.createDetalleVenta);
router.patch("/detalle_ventas/:id", detalle_ventas.updateDetalleVenta);
router.delete("/detalle_ventas/:id", detalle_ventas.deleteDetalleVenta);


module.exports = router;