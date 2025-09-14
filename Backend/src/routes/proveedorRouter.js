const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedorController");

// CRUD Proveedores
router.get("/proveedores/", proveedorController.getAllProveedores);
router.get("/proveedores/:id", proveedorController.getProveedorById);
router.post("/proveedores/", proveedorController.createProveedor);
router.patch("/proveedores/:id", proveedorController.updateProveedor);
router.delete("/proveedores/:id", proveedorController.deleteProveedor);

module.exports = router;
