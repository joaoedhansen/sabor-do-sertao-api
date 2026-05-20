const prisma = require("../prisma/prismaClient");

class DashboardController {

    async resumo(req, res) {

        try {

            // Total pedidos
            const totalPedidos =
                await prisma.pedido.count();

            // Total faturamento
            const faturamento =
                await prisma.pedido.aggregate({

                    _sum: {
                        valorTotal: true
                    }

                });

            // Total clientes
            const totalClientes =
                await prisma.usuario.count({

                    where: {
                        perfil: "CLIENTE"
                    }

                });

            // Total produtos
            const totalProdutos =
                await prisma.produto.count();

            return res.json({

                totalPedidos,

                faturamentoTotal: Number(
                    (
                        faturamento._sum.valorTotal || 0
                    ).toFixed(2)
                ),

                totalClientes,

                totalProdutos

            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: "Erro no dashboard"
            });

        }

    }

}

module.exports = new DashboardController();