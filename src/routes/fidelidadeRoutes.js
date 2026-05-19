const express = require("express");

const fidelidadeController = require("../controllers/fidelidadeController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/fidelidade",
    authMiddleware,
    fidelidadeController.buscar
);

module.exports = router;