const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {

    async login(req, res) {

        try {

            const { email, senha } = req.body;

            const usuario = await prisma.Usuario.findUnique({
                where: {
                    email
                }
            });

            if (!usuario) {
                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida) {
                return res.status(401).json({
                    erro: "Senha inválida"
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    perfil: usuario.perfil
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.json({
                usuario,
                token
            });

        } catch (error) {

            return res.status(500).json({
                erro: "Erro ao realizar login"
            });

        }

    }

}

module.exports = new AuthController();