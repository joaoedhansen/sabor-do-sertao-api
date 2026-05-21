const express = require("express");

const produtoController =
    require("../controllers/produtoController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Criar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Pizza Calabresa
 *               descricao:
 *                 type: string
 *                 example: Pizza grande
 *               preco:
 *                 type: number
 *                 example: 59.90
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Listar produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 */

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Produtos]
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
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualizar produto
 *     tags: [Produtos]
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
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado
 */

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deletar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto deletado
 */

router.post(
    "/produtos",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    produtoController.criar
);

router.get(
    "/produtos",
    authMiddleware,
    perfilMiddleware([
        "CLIENTE",
        "ATENDENTE",
        "COZINHA",
        "GERENTE"
    ]),
    produtoController.listar
);

router.get(
    "/produtos/:id",
    authMiddleware,
    perfilMiddleware([
        "CLIENTE",
        "ATENDENTE",
        "COZINHA",
        "GERENTE"
    ]),
    produtoController.buscarPorId
);

router.put(
    "/produtos/:id",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    produtoController.atualizar
);

router.delete(
    "/produtos/:id",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    produtoController.deletar
);

module.exports = router;