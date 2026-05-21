const prisma = require("../prisma/prismaClient");

class EstoqueController {

    async criar(req, res) {

        try {

            const {
                produtoId,
                unidadeId,
                quantidade
            } = req.body;

            // =========================
            // VALIDAÇÕES
            // =========================

            if (!produtoId) {

                return res.status(400).json({
                    error: "Produto é obrigatório"
                });

            }

            if (!unidadeId) {

                return res.status(400).json({
                    error: "Unidade é obrigatória"
                });

            }

            if (
                quantidade === undefined ||
                quantidade < 0
            ) {

                return res.status(400).json({
                    error:
                        "Quantidade deve ser maior ou igual a 0"
                });

            }

            // =========================
            // VALIDAR PRODUTO
            // =========================

            const produto =
                await prisma.produto.findUnique({

                    where: {
                        id: produtoId
                    }

                });

            if (!produto) {

                return res.status(404).json({
                    error: "Produto não encontrado"
                });

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
            // VALIDAR ESTOQUE DUPLICADO
            // =========================

            const estoqueExistente =
                await prisma.estoque.findFirst({

                    where: {
                        produtoId,
                        unidadeId
                    }

                });

            if (estoqueExistente) {

                return res.status(400).json({
                    error:
                        "Produto já possui estoque nesta unidade"
                });

            }

            // =========================
            // CRIAR ESTOQUE
            // =========================

            const estoque =
                await prisma.estoque.create({

                    data: {
                        produtoId,
                        unidadeId,
                        quantidade
                    },

                    include: {
                        produto: true,
                        unidade: true
                    }

                });

            return res.status(201).json(estoque);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: "Erro ao criar estoque"
            });

        }

    }

    async listar(req, res) {

        try {

            const { unidadeId } = req.query;

            let estoques;

            // =========================
            // FILTRAR POR UNIDADE
            // =========================

            if (unidadeId) {

                estoques =
                    await prisma.estoque.findMany({

                        where: {
                            unidadeId: Number(unidadeId)
                        },

                        include: {

                            produto: {
                                select: {
                                    id: true,
                                    nome: true,
                                    preco: true
                                }
                            },

                            unidade: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }

                        },

                        orderBy: {
                            quantidade: "asc"
                        }

                    });

            } else {

                estoques =
                    await prisma.estoque.findMany({

                        include: {

                            produto: {
                                select: {
                                    id: true,
                                    nome: true,
                                    preco: true
                                }
                            },

                            unidade: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }

                        },

                        orderBy: {
                            quantidade: "asc"
                        }

                    });

            }

            return res.json(estoques);

        } catch (error) {

            return res.status(500).json({
                error: "Erro ao listar estoque"
            });

        }

    }

}

module.exports = new EstoqueController();