const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//meta data
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: 'API_Food3', version: '1.0.0' },
        tags: [
            {
                name: "products",
                description: "API para products"
            },
            {
                name: "ingredients",
                description: "API para ingredients"
            },
            {
                name: "categories",
                description: "API para categorias"
            },
            {
                name: "movil",
                description: "API para movil"
            }
            
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Ensalada con pera' },
                        description: { type: 'string', example: 'Ensalada con peras frescas' },
                        price: { type: 'number', example: '90' },
                        nutrition: {type: 'string'},
                        totalCalories: { type: 'number', example: '12' },
                        inCart: { type: 'boolean' },
                        image: { type: 'string' },
                        status: { type: 'boolean' },
                    }
                },
                Ingredient: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Res' },
                        familia: { type: 'string', example: 'Animal' },
                        calories: { type: 'number', example: '30' },
                        status: { type: 'boolean' },
                    }
                }
            }
        }
    },
    apis: ['./routes/product.routes.js', './routes/ingredients.routes.js', './routes/Category.routes.js']       //./routes/*.js
}
//Docs en Json
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/product/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/product/docs.json', (req, res) => {
        res.setHeader('content-Type', 'application/json');
        res.send(swaggerSpec)
    })

    console.log(`Documentacion con Swagger local: http://localhost:3050/api-docs/#/`);
    console.log(`Documentacion con Swagger produccion: http://apifood-met.up.railway.app/api-docs/#/`);

}
module.exports = { swaggerDocs };