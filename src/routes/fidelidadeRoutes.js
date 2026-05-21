const express = require("express");

const fidelidadeController =
    require("../controllers/fidelidadeController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /fidelidade:
 *   get:
 *     summary: Consultar fidelidade do usuário
 *     tags: [Fidelidade]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fidelidade retornada com sucesso
 */

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