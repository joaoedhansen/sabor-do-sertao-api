const express = require("express");

const fidelidadeController =
    require("../controllers/fidelidadeController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

router.get(
    "/fidelidade",
    authMiddleware,
    perfilMiddleware([
        "CLIENTE",
        "ATENDENTE",
        "GERENTE"
    ]),
    fidelidadeController.buscar
);

module.exports = router;