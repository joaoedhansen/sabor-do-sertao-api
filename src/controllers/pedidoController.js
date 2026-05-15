const prisma = require("../prisma/prismaClient");

class PedidoController {

    async criar(req, res) {

        try {

            console.log(req.body);

            const {
                usuarioId,
                unidadeId,
                canalPedido,
                status,
                valorTotal
            } = req.body;

            const pedido = await prisma.pedido.create({
                data: {
                    usuarioId,
                    unidadeId,
                    canalPedido,
                    status,
                    valorTotal
                }
            });

            return res.status(201).json(pedido);

        } catch (error) {

            console.log("ERRO COMPLETO:");
            console.log(error);

            return res.status(500).json({
                erro: "Erro ao criar pedido"
            });

        }

    }

    async listar(req, res) {

        try {

            const pedidos = await prisma.pedido.findMany();

            return res.json(pedidos);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                erro: "Erro ao listar pedidos"
            });

        }

    }

}

module.exports = new PedidoController();