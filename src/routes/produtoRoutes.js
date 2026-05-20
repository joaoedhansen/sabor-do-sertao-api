const express = require("express");

const produtoController = require("../controllers/produtoController");

const authMiddleware = require("../middlewares/authMiddleware");

const perfilMiddleware = require("../middlewares/perfilMiddleware");

const router = express.Router();

router.post(
    "/produtos",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    produtoController.criar
);

router.get(
    "/produtos",
    authMiddleware,
    perfilMiddleware([
        "CLIENTE",
        "ATENDENTE",
        "COZINHA",
        "GERENTE"
    ]),
    produtoController.listar
);

router.get(
    "/produtos/:id",
    authMiddleware,
    perfilMiddleware([
        "CLIENTE",
        "ATENDENTE",
        "COZINHA",
        "GERENTE"
    ]),
    produtoController.buscarPorId
);

router.put(
    "/produtos/:id",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    produtoController.atualizar
);

router.delete(
    "/produtos/:id",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    produtoController.deletar
);

module.exports = router;