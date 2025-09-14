const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/productos", productController.getAllProductos);
router.get("/productos/:id", productController.getProductoById);
router.post("/productos", productController.createProducto);
router.patch("/productos/:id", productController.updateProducto);
router.delete("/productos/:id", productController.deleteProducto);

module.exports = router;