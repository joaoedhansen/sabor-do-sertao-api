const express = require("express");

const unidadeController =
    require("../controllers/unidadeController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /unidades:
 *   post:
 *     summary: Criar unidade
 *     tags: [Unidades]
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
 *                 example: Unidade Centro
 *               endereco:
 *                 type: string
 *                 example: Rua Central, 100
 *               telefone:
 *                 type: string
 *                 example: 11999999999
 *     responses:
 *       201:
 *         description: Unidade criada com sucesso
 */

/**
 * @swagger
 * /unidades:
 *   get:
 *     summary: Listar unidades
 *     tags: [Unidades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de unidades
 */

/**
 * @swagger
 * /unidades/{id}:
 *   get:
 *     summary: Buscar unidade por ID
 *     tags: [Unidades]
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
 *         description: Unidade encontrada
 *       404:
 *         description: Unidade não encontrada
 */

/**
 * @swagger
 * /unidades/{id}:
 *   put:
 *     summary: Atualizar unidade
 *     tags: [Unidades]
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
 *               endereco:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Unidade atualizada
 */

/**
 * @swagger
 * /unidades/{id}:
 *   delete:
 *     summary: Deletar unidade
 *     tags: [Unidades]
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
 *         description: Unidade deletada
 */

router.post(
    "/unidades",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    unidadeController.criar
);

router.get(
    "/unidades",
    authMiddleware,
    unidadeController.listar
);

router.get(
    "/unidades/:id",
    authMiddleware,
    unidadeController.buscarPorId
);

router.put(
    "/unidades/:id",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    unidadeController.atualizar
);

router.delete(
    "/unidades/:id",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    unidadeController.deletar
);

module.exports = router;