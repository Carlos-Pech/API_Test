const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const {swaggerDocs: V1SwaggerDocs} = require('./swagger')

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

V1SwaggerDocs(app, process.env.PORT || 3050)
