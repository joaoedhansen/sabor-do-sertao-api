const express = require("express");

const dashboardController =
    require("../controllers/dashboardController");

const authMiddleware =
    require("../middlewares/authMiddleware");

const perfilMiddleware =
    require("../middlewares/perfilMiddleware");

const router = express.Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Resumo do dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do dashboard
 */

router.get(

    "/dashboard",

    authMiddleware,

    perfilMiddleware(["GERENTE"]),

    dashboardController.resumo

);

module.exports = router;