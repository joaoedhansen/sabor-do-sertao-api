const express = require("express");

const estoqueController =
    require("../controllers/estoqueController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /estoques:
 *   post:
 *     summary: Criar estoque
 *     tags: [Estoque]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produtoId:
 *                 type: integer
 *                 example: 1
 *               unidadeId:
 *                 type: integer
 *                 example: 1
 *               quantidade:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Estoque criado com sucesso
 */

/**
 * @swagger
 * /estoques:
 *   get:
 *     summary: Listar estoque
 *     tags: [Estoque]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: unidadeId
 *         schema:
 *           type: integer
 *         description: Filtrar estoque por unidade
 *     responses:
 *       200:
 *         description: Lista de estoque
 */

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