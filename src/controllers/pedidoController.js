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

            // =========================
            // VALIDAÇÕES
            // =========================

            if (!unidadeId) {

                return res.status(400).json({
                    error: "Unidade é obrigatória"
                });

            }

            if (
                !canalPedido ||
                canalPedido.trim() === ""
            ) {

                return res.status(400).json({
                    error: "Canal do pedido é obrigatório"
                });

            }

            const canaisPermitidos = [
                "APP",
                "TOTEM",
                "BALCAO",
                "PICKUP",
                "WEB"
            ];

            if (
                !canaisPermitidos.includes(canalPedido)
            ) {

                return res.status(400).json({
                    error: "Canal do pedido inválido"
                });

            }

            if (
                !itens ||
                !Array.isArray(itens) ||
                itens.length === 0
            ) {

                return res.status(400).json({
                    error: "Itens do pedido são obrigatórios"
                });

            }

            // =========================
            // VALIDAR QUANTIDADE
            // =========================

            for (const item of itens) {

                if (
                    !item.quantidade ||
                    item.quantidade <= 0
                ) {

                    return res.status(400).json({
                        error:
                            "Quantidade deve ser maior que 0"
                    });

                }

            }

            // =========================
            // VALIDAR UNIDADE
            // =========================

            const unidade =
                await prisma.unidade.findUnique({

                    where: {
                        id: unidadeId
                    }

                });

            if (!unidade) {

                return res.status(404).json({
                    error: "Unidade não encontrada"
                });

            }

            // =========================
            // BUSCAR PRODUTOS
            // =========================

            const produtosIds =
                itens.map(item => item.produtoId);

            const produtos =
                await prisma.produto.findMany({

                    where: {
                        id: {
                            in: produtosIds
                        }
                    }

                });

            // =========================
            // CALCULAR TOTAL
            // =========================

            let valorTotal = 0;

            const itensPedido = [];

            for (const item of itens) {

                const produto = produtos.find(
                    p => p.id === item.produtoId
                );

                // Validar produto
                if (!produto) {

                    return res.status(404).json({
                        error:
                            `Produto ${item.produtoId} não encontrado`
                    });

                }

                // Buscar estoque
                const estoque =
                    await prisma.estoque.findFirst({

                        where: {
                            produtoId: item.produtoId,
                            unidadeId
                        }

                    });

                // Validar estoque
                if (!estoque) {

                    return res.status(404).json({
                        error:
                            `Estoque não encontrado para produto ${item.produtoId}`
                    });

                }

                // Validar quantidade
                if (estoque.quantidade < item.quantidade) {

                    return res.status(409).json({
                        error:
                            `Estoque insuficiente para produto ${produto.nome}`
                    });

                }

                // Calcular subtotal
                const subtotal = Number(
                    (
                        produto.preco *
                        item.quantidade
                    ).toFixed(2)
                );

                valorTotal = Number(
                    (
                        valorTotal + subtotal
                    ).toFixed(2)
                );

                itensPedido.push({

                    produtoId: produto.id,
                    quantidade: item.quantidade,
                    precoUnitario: produto.preco

                });

            }

            // =========================
            // CRIAR PEDIDO
            // =========================

            const pedido =
                await prisma.pedido.create({

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

                        unidade: true,

                        itens: {
                            include: {
                                produto: true
                            }
                        }

                    }

                });

            // =========================
            // ATUALIZAR ESTOQUE
            // =========================

            for (const item of itens) {

                const estoque =
                    await prisma.estoque.findFirst({

                        where: {
                            produtoId: item.produtoId,
                            unidadeId
                        }

                    });

                await prisma.estoque.update({

                    where: {
                        id: estoque.id
                    },

                    data: {
                        quantidade:
                            estoque.quantidade -
                            item.quantidade
                    }

                });

            }

            // =========================
            // FIDELIDADE
            // =========================

            const pontosGanhos =
                Math.floor(valorTotal / 10);

            const fidelidade =
                await prisma.fidelidade.findFirst({

                    where: {
                        usuarioId
                    }

                });

            if (fidelidade) {

                await prisma.fidelidade.update({

                    where: {
                        id: fidelidade.id
                    },

                    data: {
                        pontos:
                            fidelidade.pontos +
                            pontosGanhos
                    }

                });

            } else {

                await prisma.fidelidade.create({

                    data: {
                        usuarioId,
                        pontos: pontosGanhos
                    }

                });

            }

            return res.status(201).json(pedido);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error:
                    error.message ||
                    "Erro ao criar pedido"
            });

        }

    }

    async listar(req, res) {

        try {

            const usuario = req.usuario;

            const { canalPedido } = req.query;

            let pedidos;

            // CLIENTE
            if (usuario.perfil === "CLIENTE") {

                pedidos =
                    await prisma.pedido.findMany({

                        where: {

                            usuarioId: usuario.id,

                            ...(canalPedido && {
                                canalPedido
                            })

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

            } else {

                // ATENDENTE / COZINHA / GERENTE

                pedidos =
                    await prisma.pedido.findMany({

                        where: {

                            ...(canalPedido && {
                                canalPedido
                            })

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

            }

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

            const pedido =
                await prisma.pedido.findUnique({

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
                "PRONTO",
                "SAIU_ENTREGA",
                "FINALIZADO",
                "CANCELADO"
            ];

            if (!statusPermitidos.includes(status)) {

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
                        id: Number(id)
                    },

                    include: {
                        itens: true
                    }

                });

            if (!pedido) {

                return res.status(404).json({
                    error: "Pedido não encontrado"
                });

            }

            // =========================
            // VALIDAR CANCELAMENTO
            // =========================

            if (
                pedido.status === "FINALIZADO"
            ) {

                return res.status(400).json({
                    error:
                        "Pedido finalizado não pode ser cancelado"
                });

            }

            if (
                pedido.status === "CANCELADO"
            ) {

                return res.status(400).json({
                    error:
                        "Pedido já está cancelado"
                });

            }

            // =========================
            // DEVOLVER ESTOQUE
            // =========================

            if (status === "CANCELADO") {

                for (const item of pedido.itens) {

                    const estoque =
                        await prisma.estoque.findFirst({

                            where: {
                                produtoId: item.produtoId,
                                unidadeId: pedido.unidadeId
                            }

                        });

                    if (estoque) {

                        await prisma.estoque.update({

                            where: {
                                id: estoque.id
                            },

                            data: {
                                quantidade:
                                    estoque.quantidade +
                                    item.quantidade
                            }

                        });

                    }

                }

            }

            // =========================
            // ATUALIZAR STATUS
            // =========================

            const pedidoAtualizado =
                await prisma.pedido.update({

                    where: {
                        id: Number(id)
                    },

                    data: {
                        status
                    }

                });

            return res.json(pedidoAtualizado);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error:
                    "Erro ao atualizar status do pedido"
            });

        }

    }

}

module.exports = new PedidoController();