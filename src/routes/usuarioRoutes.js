const express = require("express");

const usuarioController =
    require("../controllers/usuarioController");

const router = express.Router();

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Criar usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: 12345
 *               perfil:
 *                 type: string
 *                 example: CLIENTE
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

router.post(
    "/usuario",
    usuarioController.criar
);

module.exports = router;