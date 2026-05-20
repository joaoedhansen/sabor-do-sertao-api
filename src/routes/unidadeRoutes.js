const express = require("express");

const unidadeController =
    require("../controllers/unidadeController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

router.post(
    "/unidades",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    unidadeController.criar
);

router.get(
    "/unidades",
    authMiddleware,
    unidadeController.listar
);

router.get(
    "/unidades/:id",
    authMiddleware,
    unidadeController.buscarPorId
);

router.put(
    "/unidades/:id",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    unidadeController.atualizar
);

router.delete(
    "/unidades/:id",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    unidadeController.deletar
);

module.exports = router;