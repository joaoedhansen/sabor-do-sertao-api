const prisma = require("../prisma/prismaClient");

class ProdutoController {

    async criar(req, res) {

        try {

            const {
                nome,
                descricao,
                preco
            } = req.body;

            const produto = await prisma.produto.create({
                data: {
                    nome,
                    descricao,
                    preco
                }
            });

            return res.status(201).json(produto);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                erro: "Erro ao criar produto"
            });

        }

    }

    async listar(req, res) {

        try {

            const produtos = await prisma.produto.findMany();

            return res.json(produtos);

        } catch (error) {

            return res.status(500).json({
                erro: "Erro ao listar produtos"
            });

        }

    }

    async buscarPorId(req, res) {

        try {

            const { id } = req.params;

            const produto = await prisma.produto.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!produto) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }

            return res.json(produto);

        } catch (error) {

            return res.status(500).json({
                erro: "Erro ao buscar produto"
            });

        }

    }

    async atualizar(req, res) {

        try {

            const { id } = req.params;

            const {
                nome,
                descricao,
                preco
            } = req.body;

            const produto = await prisma.produto.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome,
                    descricao,
                    preco
                }
            });

            return res.json(produto);

        } catch (error) {

            return res.status(500).json({
                erro: "Erro ao atualizar produto"
            });

        }

    }

    async deletar(req, res) {

        try {

            const { id } = req.params;

            await prisma.produto.delete({
                where: {
                    id: Number(id)
                }
            });

            return res.status(204).send();

        } catch (error) {

            return res.status(500).json({
                erro: "Erro ao deletar produto"
            });

        }

    }

}

module.exports = new ProdutoController();