const prisma = require("../prisma/prismaClient");

class PagamentoController {

    async mock(req, res) {

        try {

            const {
                pedidoId,
                status,
                metodo
            } = req.body;

            // =========================
            // VALIDAR STATUS
            // =========================

            const statusPermitidos = [
                "APROVADO",
                "RECUSADO"
            ];

            if (
                !statusPermitidos.includes(status)
            ) {

                return res.status(400).json({
                    error: "Status inválido"
                });

            }

            // =========================
            // BUSCAR PEDIDO
            // =========================

            const pedido =
                await prisma.pedido.findUnique({

                    where: {
                        id: pedidoId
                    }

                });

            if (!pedido) {

                return res.status(404).json({
                    error: "Pedido não encontrado"
                });

            }

            // =========================
            // CRIAR PAGAMENTO
            // =========================

            const pagamento =
                await prisma.pagamento.create({

                    data: {

                        pedidoId,
                        status,
                        metodo,
                        valor: pedido.valorTotal

                    }

                });

            // =========================
            // ATUALIZAR STATUS PEDIDO
            // =========================

            let novoStatusPedido;

            if (status === "APROVADO") {

                novoStatusPedido = "PAGO";

            } else {

                novoStatusPedido =
                    "PAGAMENTO_RECUSADO";

            }

            await prisma.pedido.update({

                where: {
                    id: pedidoId
                },

                data: {
                    status: novoStatusPedido
                }

            });

            return res.status(201).json({

                message:
                    "Pagamento processado com sucesso",

                pagamento

            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error:
                    "Erro ao processar pagamento"
            });

        }

    }

}

module.exports = new PagamentoController();