const express = require("express");

const cors = require("cors");

require("dotenv").config();

const authRoutes =
    require("./routes/authRoutes");

const pedidoRoutes =
    require("./routes/pedidoRoutes");

const produtoRoutes =
    require("./routes/produtoRoutes");

const fidelidadeRoutes =
    require("./routes/fidelidadeRoutes");

const estoqueRoutes =
    require("./routes/estoqueRoutes");

const logRoutes =
    require("./routes/logRoutes");

const dashboardRoutes =
    require("./routes/dashboardRoutes");

const relatorioRoutes =
    require("./routes/relatorioRoutes");

const unidadeRoutes =
    require("./routes/unidadeRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(authRoutes);

app.use(pedidoRoutes);

app.use(produtoRoutes);

app.use(fidelidadeRoutes);

app.use(estoqueRoutes);

app.use(logRoutes);

app.use(dashboardRoutes);

app.use(relatorioRoutes);

app.use(unidadeRoutes);

app.get("/", (req, res) => {

    return res.json({
        message:
            "API Sabor do Sertão funcionando!"
    });

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});