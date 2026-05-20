const express = require("express");

const pedidoController = require("../controllers/pedidoController");

const authMiddleware = require("../middlewares/authMiddleware");

const perfilMiddleware = require("../middlewares/perfilMiddleware");

const router = express.Router();

router.post(
    "/pedidos",
    authMiddleware,
    perfilMiddleware([
        "CLIENTE",
        "ATENDENTE",
        "GERENTE"
    ]),
    pedidoController.criar
);

router.get(
    "/pedidos",
    authMiddleware,
    perfilMiddleware([
        "ATENDENTE",
        "COZINHA",
        "GERENTE"
    ]),
    pedidoController.listar
);

router.get(
    "/pedidos/:id",
    authMiddleware,
    perfilMiddleware([
        "ATENDENTE",
        "COZINHA",
        "GERENTE"
    ]),
    pedidoController.buscarPorId
);

router.patch(
    "/pedidos/:id/status",
    authMiddleware,
    perfilMiddleware([
        "COZINHA",
        "GERENTE"
    ]),
    pedidoController.atualizarStatus
);

module.exports = router;