const express = require('express')
const router = express.Router()
const userControllers  = require('../controllers/UserController')
const upload = require('../middleware/upload')



router.get('/',userControllers.index) // api.com/product/ Index: Listar todos los productos
router.get('/:key/:value',userControllers.find,userControllers.find)
router.post('/store',userControllers.create)
router.put('/:key/:value', userControllers.find,userControllers.update)
router.delete('/:key/:value', userControllers.find,userControllers.remove)
router.post('/loginUser',userControllers.loginUser)
// router.post('/',userControllers.newUser)




module.exports=router