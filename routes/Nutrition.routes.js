const express = require('express')
const router = express.Router()
const app = express()

const NutritionController  = require('../controllers/NutritionController')
const upload = require('../middleware/upload')



// app.use(AuthToken)
router.get('/',NutritionController.index)
router.post('/store',NutritionController.store)
router.get('/find/:id',NutritionController.getById)
router.get('/:key/:value',NutritionController.find,NutritionController.show)


module.exports=router