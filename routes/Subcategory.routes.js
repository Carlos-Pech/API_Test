const express = require('express')
const router = express.Router()
const app = express()

const Subcategorycontroller  = require('../controllers/SubcategoryController')
const upload = require('../middleware/upload')
const AuthToken = require('../middleware/AuthToken');



// app.use(AuthToken)
router.get('/',Subcategorycontroller.index)
router.get('/find/:id',Subcategorycontroller.view)
router.post('/store',Subcategorycontroller.store)
router.get('/:key/:value',Subcategorycontroller.find,Subcategorycontroller.show)





module.exports=router