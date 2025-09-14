const express = require("express");
const router = express.Router();
const compraController = require("../controllers/compraController");

// CRUD Productos
router.get("/compras", compraController.getAllCompras);
router.get("/compras/:id", compraController.getCompraById);
router.post("/compras/", compraController.createCompra);
router.patch("/compras/:id", compraController.updateCompra);
router.delete("/compras/:id", compraController.deleteCompra);

module.exports = router;
