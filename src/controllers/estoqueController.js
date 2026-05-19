const prisma = require("../prisma/prismaClient");

class EstoqueController {

    async criar(req, res) {

        try {

            const {
                produtoId,
                unidadeId,
                quantidade
            } = req.body;

            const estoque =
                await prisma.estoque.create({

                    data: {
                        produtoId,
                        unidadeId,
                        quantidade
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

            const estoques =
                await prisma.estoque.findMany({

                    include: {
                        produto: true,
                        unidade: true
                    }

                });

            return res.json(estoques);

        } catch (error) {

            return res.status(500).json({
                error: "Erro ao listar estoque"
            });

        }

    }

}

module.exports = new EstoqueController();