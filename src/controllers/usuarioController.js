const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");

class UsuarioController {

    async criar(req, res) {

        try {

            const { nome, email, senha, perfil } = req.body;

            const senhaHash = await bcrypt.hash(senha, 8);

            const usuario = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha: senhaHash,
                    perfil
                }
            });

            return res.status(201).json(usuario);

        } catch (error) {

            return res.status(500).json({
                erro: "Erro ao criar usuário"
            });

        }

    }

}

module.exports = new UsuarioController();