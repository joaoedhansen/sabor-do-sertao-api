const prisma = require("../prisma/prismaClient");

class FidelidadeController {

    async buscar(req, res) {

        try {

            const usuarioId = req.usuario.id;

            let fidelidade = await prisma.fidelidade.findFirst({
                where: {
                    usuarioId
                }
            });

            // Se não existir, cria automaticamente
            if (!fidelidade) {

                fidelidade = await prisma.fidelidade.create({
                    data: {
                        usuarioId,
                        pontos: 0
                    }
                });

            }

            return res.json(fidelidade);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: "Erro ao buscar fidelidade"
            });

        }

    }

}

module.exports = new FidelidadeController();