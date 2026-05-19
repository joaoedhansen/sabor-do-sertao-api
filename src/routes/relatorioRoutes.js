const express = require("express");

const relatorioController = require("../controllers/relatorioController");

const authMiddleware = require("../middlewares/authMiddleware");

const perfilMiddleware = require("../middlewares/perfilMiddleware");

const router = express.Router();

router.get(
    "/relatorios/vendas",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    relatorioController.vendas
);

module.exports = router;