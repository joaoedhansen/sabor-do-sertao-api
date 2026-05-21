const swaggerJsdoc = require("swagger-jsdoc");

const options = {

    definition: {

        openapi: "3.0.0",

        info: {

            title: "API Sabor do Sertão",

            version: "1.0.0",

            description:
                "API de gestão de pedidos para restaurante"

        },

        servers: [

            {
                url: "http://localhost:3000"
            }

        ],

        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT"

                }

            }

        },

        security: [

            {
                bearerAuth: []
            }

        ]

    },

    apis: ["./src/routes/*.js"]

};

const swaggerSpec =
    swaggerJsdoc(options);

module.exports = swaggerSpec;