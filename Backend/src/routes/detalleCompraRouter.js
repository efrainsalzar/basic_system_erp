const express = require("express");
const detalle_compras = require("../controllers/detalleCompraController");

const router = express.Router();

//router.get("/detalle_compras", detalle_compras.getDetallesByCompraId);
router.get("/detalle_compras/:id", detalle_compras.getDetallesByCompraId);
router.post("/detalle_compras", detalle_compras.createDetalle);
router.patch("/detalle_compras/:id", detalle_compras.updateDetalle);
router.delete("/detalle_compras/:id", detalle_compras.deleteDetalle);


module.exports = router;