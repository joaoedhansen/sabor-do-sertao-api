const express = require("express");

const pedidoController = require("../controllers/pedidoController");

const authMiddleware = require("../middlewares/authMiddleware");

const perfilMiddleware = require("../middlewares/perfilMiddleware");

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

router.get(
    "/pedidos/:id",
    authMiddleware,
    pedidoController.buscarPorId
);

router.patch(
    "/pedidos/:id/status",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    pedidoController.atualizarStatus
);

module.exports = router;