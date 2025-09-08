const express = require("express");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/usuarios", getAllUsers);

module.exports = router;