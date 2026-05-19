const prisma = require("../prisma/prismaClient");

async function registrarLog(usuarioId, acao) {

    try {

        await prisma.logAuditoria.create({

            data: {
                usuarioId,
                acao
            }

        });

    } catch (error) {

        console.log(
            "Erro ao registrar log:",
            error
        );

    }

}

module.exports = registrarLog;