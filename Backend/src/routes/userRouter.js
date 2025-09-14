const express = require("express");
const userRouter = require("../controllers/userController");

const { loginUser } = require("../controllers/loginController");

const router = express.Router();

router.get("/usuarios", userRouter.getAllUsers);
router.get("/usuarios/:id", userRouter.getUserById);
router.post("/usuarios", userRouter.createUser);
router.patch("/usuarios/:id", userRouter.updateUser);
router.delete("/usuarios/:id", userRouter.deleteUser);

// Ruta de login
router.post("/login", loginUser);

module.exports = router;