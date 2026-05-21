const express = require("express");

const logController =
    require("../controllers/logController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Listar logs de auditoria
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de logs retornada com sucesso
 */

router.get(
    "/logs",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    logController.listar
);

module.exports = router;