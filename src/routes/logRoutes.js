const express = require("express");

const logController =
    require("../controllers/logController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

router.get(
    "/logs",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    logController.listar
);

module.exports = router;