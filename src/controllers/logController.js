const prisma = require("../prisma/prismaClient");

class LogController {

    async listar(req, res) {

        try {

            const logs =
                await prisma.logAuditoria.findMany({

                    include: {

                        usuario: {
                            select: {
                                id: true,
                                nome: true,
                                email: true
                            }
                        }

                    },

                    orderBy: {
                        createdAt: "desc"
                    }

                });

            return res.json(logs);

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                error: "Erro ao listar logs"
            });

        }

    }

}

module.exports = new LogController();