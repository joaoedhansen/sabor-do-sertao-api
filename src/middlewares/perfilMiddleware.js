function perfilMiddleware(perfisPermitidos) {

    return (req, res, next) => {

        const perfilUsuario = req.usuario.perfil;

        if (!perfisPermitidos.includes(perfilUsuario)) {

            return res.status(403).json({
                erro: "Acesso negado"
            });

        }

        next();

    };

}

module.exports = perfilMiddleware;