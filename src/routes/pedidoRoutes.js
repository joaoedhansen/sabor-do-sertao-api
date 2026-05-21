const express = require("express");

const pedidoController =
    require("../controllers/pedidoController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unidadeId:
 *                 type: integer
 *                 example: 1
 *               canalPedido:
 *                 type: string
 *                 example: APP
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: integer
 *                       example: 1
 *                     quantidade:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Listar pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /pedidos/{id}/status:
 *   patch:
 *     summary: Atualizar status do pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: PRONTO
 *     responses:
 *       200:
 *         description: Status atualizado
 */

router.post(
    "/pedidos",
    authMiddleware,
    perfilMiddleware([
        "CLIENTE",
        "ATENDENTE",
        "GERENTE"
    ]),
    pedidoController.criar
);

router.get(
    "/pedidos",
    authMiddleware,
    perfilMiddleware([
        "ATENDENTE",
        "COZINHA",
        "GERENTE"
    ]),
    pedidoController.listar
);

router.get(
    "/pedidos/:id",
    authMiddleware,
    perfilMiddleware([
        "ATENDENTE",
        "COZINHA",
        "GERENTE"
    ]),
    pedidoController.buscarPorId
);

router.patch(
    "/pedidos/:id/status",
    authMiddleware,
    perfilMiddleware([
        "COZINHA",
        "GERENTE"
    ]),
    pedidoController.atualizarStatus
);

module.exports = router;