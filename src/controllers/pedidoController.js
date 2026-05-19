const prisma = require("../prisma/prismaClient");

class PedidoController {

    async criar(req, res) {

        try {

            const usuarioId = req.usuario.id;

            const {
                unidadeId,
                canalPedido,
                itens
            } = req.body;

            // Buscar produtos no banco
            const produtosIds = itens.map(item => item.produtoId);

            const produtos = await prisma.produto.findMany({
                where: {
                    id: {
                        in: produtosIds
                    }
                }
            });

            // Calcular valor total
            let valorTotal = 0;

            const itensPedido = itens.map(item => {

                const produto = produtos.find(
                    p => p.id === item.produtoId
                );

                if (!produto) {
                    throw new Error(
                        `Produto ${item.produtoId} não encontrado`
                    );
                }

                const subtotal =
                    produto.preco * item.quantidade;

                valorTotal += subtotal;

                return {
                    produtoId: produto.id,
                    quantidade: item.quantidade,
                    precoUnitario: produto.preco
                };

            });

            // Criar pedido + itens
            const pedido = await prisma.pedido.create({
                data: {
                    usuarioId,
                    unidadeId,
                    canalPedido,
                    status: "EM_PREPARO",
                    valorTotal,

                    itens: {
                        create: itensPedido
                    }
                },

                include: {
                    itens: {
                        include: {
                            produto: true
                        }
                    }
                }
            });

            return res.status(201).json(pedido);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: error.message || "Erro ao criar pedido"
            });

        }

    }

    async listar(req, res) {

        try {

            const pedidos = await prisma.pedido.findMany({

                include: {

                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },

                    unidade: true,

                    itens: {
                        include: {
                            produto: true
                        }
                    }

                }

            });

            return res.json(pedidos);

        } catch (error) {

            return res.status(500).json({
                error: "Erro ao listar pedidos"
            });

        }

    }

    async buscarPorId(req, res) {

        try {

            const { id } = req.params;

            const pedido = await prisma.pedido.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    unidade: true,
                    itens: {
                        include: {
                            produto: true
                        }
                    }
                }
            });

            if (!pedido) {
                return res.status(404).json({
                    error: "Pedido não encontrado"
                });
            }

            return res.json(pedido);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: "Erro ao buscar pedido"
            });

        }

    }

    async atualizarStatus(req, res) {

        try {

            const { id } = req.params;

            const { status } = req.body;

            const statusPermitidos = [
                "EM_PREPARO",
                "SAIU_ENTREGA",
                "FINALIZADO",
                "CANCELADO"
            ];

            if (!statusPermitidos.includes(status)) {

                return res.status(400).json({
                    error: "Status inválido"
                });

            }

            const pedido = await prisma.pedido.update({
                where: {
                    id: Number(id)
                },
                data: {
                    status
                }
            });

            return res.json(pedido);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: "Erro ao atualizar status do pedido"
            });

        }

    }

}

module.exports = new PedidoController();