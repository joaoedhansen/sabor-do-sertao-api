const express = require("express");

const pedidoController = require("../controllers/pedidoController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/pedidos",
    authMiddleware,
    pedidoController.criar
);

router.get(
    "/pedidos",
    authMiddleware,
    pedidoController.listar
);

module.exports = router;