const express = require("express");

const relatorioController =
    require("../controllers/relatorioController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /relatorios/vendas:
 *   get:
 *     summary: Relatório de vendas
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Relatório de vendas retornado com sucesso
 */

router.get(
    "/relatorios/vendas",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    relatorioController.vendas
);

module.exports = router;