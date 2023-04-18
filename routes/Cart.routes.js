// const express = require('express')
// const router = express.Router()

// const CartController = require ('../controllers/CartController')

// router.get("/products-cart", CartController.getProductsCart);
// router.get('/total-calories',CartController.TotalCalories)
// router.post('/add-cart', CartController.addProductCart);


// module.exports =router

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/mesas/:mesaId/cart', cartController.getCartProducts);
router.post('/mesas/:mesaId/cart/:id', cartController.addToCart);
// router.delete('/cart/:id', cartController.removeFromCart);
// router.get('/find/:id', cartController.getCartById);
// router.put('/cart/:id', cartController.updateCart);

router.delete('/:clienteId/productos/:id', cartController.removeFromCart);

module.exports = router;
