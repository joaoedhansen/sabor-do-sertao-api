const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const perfilMiddleware = require("../middlewares/perfilMiddleware");

const usuarioController = require("../controllers/usuarioController");

const router = express.Router();

router.post(
    "/usuarios",
    authMiddleware,
    perfilMiddleware(["GERENTE"]),
    usuarioController.criar
);

module.exports = router;