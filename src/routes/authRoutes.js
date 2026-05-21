const express = require("express");

const authController =
    require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: gerente@gmail.com
 *               senha:
 *                 type: string
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

router.post(
    "/login",
    authController.login
);

module.exports = router;