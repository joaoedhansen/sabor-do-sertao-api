const prisma = require("../prisma/prismaClient");

class RelatorioController {

    async vendas(req, res) {

        try {

            // Buscar pedidos
            const pedidos = await prisma.pedido.findMany();

            // Total faturado
            const totalVendas = pedidos.reduce(
                (total, pedido) => total + pedido.valorTotal,
                0
            );

            // Quantidade de pedidos
            const quantidadePedidos = pedidos.length;

            // Ticket médio
            const ticketMedio =
                quantidadePedidos > 0
                    ? totalVendas / quantidadePedidos
                    : 0;

            return res.json({
                totalVendas,
                quantidadePedidos,
                ticketMedio
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: "Erro ao gerar relatório"
            });

        }

    }

}

module.exports = new RelatorioController();