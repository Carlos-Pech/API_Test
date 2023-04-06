const express =  require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
//para inicar la api "npm run dev"
const ProductRoute= require('./routes/product.routes')
const UserRoute=require('./routes/user.routes')
const AuthRoute=require('./routes/auth.routes')
const IngredientsRoute=require('./routes/ingredients.routes')
const CategoryRoute = require('./routes/Category.routes')
const SubcategoryRoute = require('./routes/Subcategory.routes')
const NutritionRoute = require('./routes/Nutrition.routes')
const CartRoute = require('./routes/Cart.routes')
const AuthToken = require('./middleware/AuthToken');
const CaloriesRoute = require('./routes/Calories.routes')
const MesaRoutes = require('./routes/Mesa.routes')



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const {swaggerDocs: V1SwaggerDocs} = require('./swagger')


//Prueba
const app = express()

app.use(cors())

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://carlos:Monopolis19@dbcluster.khexvht.mongodb.net/FodMet123?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})

const db=mongoose.connection

db.on('error', (err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database connection established')
})


const PORT = process.env.PORT || 3050
//cors
// var cors = require('cors');
// var corsOptions ={
//     origin:'*',
//     optionsSuccessStatus:200
// }
// app.use(cors(corsOptions))


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))



app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
    V1SwaggerDocs(app, PORT)
})

// app.use(AuthToken)  
app.use('/auth',AuthRoute)
app.use('/api/product',ProductRoute)
app.use('/user',UserRoute)
app.use('/ingredients/add', IngredientsRoute)
app.use('/category/add',CategoryRoute)
app.use('/subcategory/add', SubcategoryRoute)
app.use('/nutrition/add',NutritionRoute)
app.use('/api/cart',CartRoute)
app.use('/calculateCalories' ,CaloriesRoute)
app.use('/mesa',MesaRoutes)

//rutas para movil1

//Pruebas


//fin rutas movil1

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.use('/images', express.static(path.join(__dirname, 'uploads')));