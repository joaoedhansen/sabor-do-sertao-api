const express = require("express");

const estoqueController =
    require("../controllers/estoqueController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

router.post(
    "/estoques",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    estoqueController.criar
);

router.get(
    "/estoques",
    authMiddleware,
    perfilMiddleware([
        "COZINHA",
        "GERENTE"
    ]),
    estoqueController.listar
);

module.exports = router;