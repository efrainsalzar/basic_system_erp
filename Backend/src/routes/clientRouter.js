const express = require("express");
const clientRouter = require("../controllers/clientController");

const router = express.Router();

router.get("/clientes", clientRouter.getAllClientes);
router.get("/clientes/:id", clientRouter.getClienteById);
router.post("/clientes", clientRouter.createCliente);
router.patch("/clientes/:id", clientRouter.updateCliente);
router.delete("/clientes/:id", clientRouter.deleteCliente);


module.exports = router;