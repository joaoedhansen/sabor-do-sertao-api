const prisma = require("../prisma/prismaClient");

class UnidadeController {

    async criar(req, res) {

        try {

            const {
                nome,
                endereco,
                telefone
            } = req.body;

            // =========================
            // VALIDAÇÕES
            // =========================

            if (!nome || nome.trim() === "") {

                return res.status(400).json({
                    error: "Nome é obrigatório"
                });

            }

            if (
                !endereco ||
                endereco.trim() === ""
            ) {

                return res.status(400).json({
                    error: "Endereço é obrigatório"
                });

            }

            if (
                !telefone ||
                telefone.trim() === ""
            ) {

                return res.status(400).json({
                    error: "Telefone é obrigatório"
                });

            }

            const unidade =
                await prisma.unidade.create({

                    data: {
                        nome,
                        endereco,
                        telefone
                    }

                });

            return res.status(201).json(unidade);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: "Erro ao criar unidade"
            });

        }

    }

    async listar(req, res) {

        try {

            const unidades =
                await prisma.unidade.findMany();

            return res.json(unidades);

        } catch (error) {

            return res.status(500).json({
                error: "Erro ao listar unidades"
            });

        }

    }

    async buscarPorId(req, res) {

        try {

            const { id } = req.params;

            const unidade =
                await prisma.unidade.findUnique({

                    where: {
                        id: Number(id)
                    }

                });

            if (!unidade) {

                return res.status(404).json({
                    error: "Unidade não encontrada"
                });

            }

            return res.json(unidade);

        } catch (error) {

            return res.status(500).json({
                error: "Erro ao buscar unidade"
            });

        }

    }

    async atualizar(req, res) {

        try {

            const { id } = req.params;

            const {
                nome,
                endereco,
                telefone
            } = req.body;

            // =========================
            // VALIDAÇÕES
            // =========================

            if (!nome || nome.trim() === "") {

                return res.status(400).json({
                    error: "Nome é obrigatório"
                });

            }

            if (
                !endereco ||
                endereco.trim() === ""
            ) {

                return res.status(400).json({
                    error: "Endereço é obrigatório"
                });

            }

            if (
                !telefone ||
                telefone.trim() === ""
            ) {

                return res.status(400).json({
                    error: "Telefone é obrigatório"
                });

            }

            const unidade =
                await prisma.unidade.update({

                    where: {
                        id: Number(id)
                    },

                    data: {
                        nome,
                        endereco,
                        telefone
                    }

                });

            return res.json(unidade);

        } catch (error) {

            return res.status(500).json({
                error: "Erro ao atualizar unidade"
            });

        }

    }

    async deletar(req, res) {

        try {

            const { id } = req.params;

            const unidade =
                await prisma.unidade.findUnique({

                    where: {
                        id: Number(id)
                    }

                });

            if (!unidade) {

                return res.status(404).json({
                    error: "Unidade não encontrada"
                });

            }

            await prisma.unidade.delete({

                where: {
                    id: Number(id)
                }

            });

            return res.status(204).send();

        } catch (error) {

            return res.status(500).json({
                error: "Erro ao deletar unidade"
            });

        }

    }

}

module.exports = new UnidadeController();