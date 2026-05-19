const express = require("express");
const cors = require("cors");

require("dotenv").config();

const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const produtoRoutes = require("./routes/produtoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuarioRoutes);
app.use(authRoutes);
app.use(pedidoRoutes);
app.use(produtoRoutes);

app.get("/", (req, res) => {
    return res.json({
        message: "API Sabor do Sertão funcionando!"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});