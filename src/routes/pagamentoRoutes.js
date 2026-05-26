const express = require("express");

const pagamentoController =
    require("../controllers/pagamentoController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /pagamentos/mock:
 *   post:
 *     summary: Mock de pagamento
 *     tags: [Pagamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pagamento processado
 */

router.post(
    "/pagamentos/mock",
    authMiddleware,
    perfilMiddleware([
        "ATENDENTE",
        "GERENTE"
    ]),
    pagamentoController.mock
);

module.exports = router;