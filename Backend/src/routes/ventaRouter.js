const express = require('express');
const ventaController = require('../controllers/ventaController');

const router = express.Router();

router.get('/ventas', ventaController.getAllVentas);
router.post('/ventas', ventaController.createVenta);
router.get('/ventas/:id', ventaController.getVentaById);
router.patch('/ventas/:id', ventaController.updateVenta);
router.delete('/ventas/:id', ventaController.deleteVenta);

module.exports = router;