// const { response } = require("express");
// const Cart = require("../models/Cart2");
// const Kilo = require("../models/Cart");
// const subschema = require("../models/subschema");
// const Product = require("../models/Product");
// const Client = require('../models/Client')
// //cart movil
// const getCart = async (req, res) => {
//   try {
//     const carts = await Cart.find().populate("Products", "name price image");
//     res.json({ docs: carts });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getCartById = async (req, res) => {
//   try {
//     const cart = await Cart.findById(req.params.id).populate(
//       "Products",
//       "name price image"
//     );
//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }
//     res.json({ docs: [cart] });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getProductInCart = async (req, res) => {
//   try {
//     const cartId = req.params.cartId;
//     const productId = req.params.productId;

//     const cart = await Cart.findById(cartId).populate("productos");
//     if (!cart) {
//       return res.status(404).json({ error: "El carrito no existe" });
//     }

//     const product = cart.Products.find((p) => p._id == productId);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ error: "El producto no existe en este carrito" });
//     }

//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const addToCart = async (req, res) => {
//   try {
//     const clienteId = req.params.clienteId;
//     const productId = req.params.id;

//     const product = await Product.findById(productId)
//       .select('-__v -createdAt -updatedAt') // Excluir campos que no se necesitan
//       .lean();

//     if (!product) {
//       console.log(product)
//       return res.status(404).json({ error: 'El producto no existe' });
      
//     }
//     console.log(clienteId)
//     let cart = await Cart.findOne({ cliente: clienteId });
//     if (!cart) {
//       cart = new Cart({
//         cliente: clienteId,
//         Products: [
//           product
//         ]
//       });
//     } else {
//       cart.Products.push(product);
//     }
//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// const updateCart = async (req, res, next) => {
//   try {
//     const { cartId } = req.params;
//     const { products } = req.body;

//     const updatedCart = await Cart.findByIdAndUpdate(
//       cartId, // ID del carrito a actualizar
//       { products }, // Datos a actualizar
//       { new: true } // Opción para que devuelva el carrito actualizado
//     );

//     res.status(200).json({ cart: updatedCart });
//   } catch (error) {
//     next(error);
//   }
// };

// // const ObjectId = require('mongoose').Types.ObjectId;

// const removeFromCart = async (req, res, next) => {
//   try {
//     const cart = await Cart.findByIdAndDelete(req.params.id);
//     console.log(cart);
//     if (!cart) {
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }
//     res.json({ message: "Carrito eliminado correctamente" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// //vaciar el carrito
// const removeAllFromCart = async (req, res, next) => {
//   try {
//     const result = await Cart.deleteMany({});
//     console.log(result);
//     res.json({ message: "Carritos eliminados correctamente" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   getCart,
//   addToCart,
//   removeFromCart,
//   updateCart,
//   getProductInCart,
//   getCartById,
//   removeAllFromCart,
// };


const { response } = require("express");
const Cart = require("../models/Cart2");
const Kilo = require("../models/Cart");
const subschema = require("../models/subschema");
const Product = require("../models/Product");
const Client = require('../models/Client')
const mongoose = require('mongoose')
const Mesa = require('../models/Mesa')
//cart movil

const addToCart = async (req, res) => {
  try {
    const mesaId = req.params.mesaId;
    const productId = req.params.id;

    const product = await Product.findById(productId)
      .select('-__v -createdAt -updatedAt') // Excluir campos que no se necesitan
      .lean();

    if (!product) {
      console.log(product)
      return res.status(404).json({ error: 'El producto no existe' });
    }

    let mesa = await Mesa.findOne({ _id: mesaId });
    let cart;

    if (!mesa) {
      mesa = new Mesa({ _id: mesaId });
      await mesa.save();

      cart = new Cart({
        mesa: mesa._id,
        Products: [
          product
        ]
      });
    } else {
      cart = await Cart.findOne({ mesa: mesa._id });

      if (!cart) {
        cart = new Cart({
          mesa: mesa._id,
          Products: [
            product
          ]
        });
      } else {
        cart.Products.push(product);
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Mostrar productos que tiene el carrito de la mesa
const getCartProducts = async (req, res) => {
  try {
    const mesaId = req.params.mesaId;

    const cart = await Cart.findOne({ mesa: mesaId })
      .populate('mesa', 'nombre _id')
      .select('-__v -createdAt -updatedAt')
      .lean();

    if (!cart) {
      return res.status(404).json({ error: 'El carrito no existe' });
    }

    const cartProducts = cart.Products;
    const response = {
      docs: {
        mesa: {
          _id: cart.mesa._id,
          nombre: cart.mesa.nombre,
        },
        cartProducts,
      },
    };

    res.json(response);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const removeFromCart = async (req, res) => {
  try {
    const clienteId = req.params.clienteId;
    const productId = req.params.id;

    let cart = await Cart.findOne({ cliente: clienteId });
    if (!cart) {
      return res.status(404).json({ error: 'El carrito no existe' });
    }

    cart.Products = cart.Products.filter(product => product._id.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
 
  addToCart,
  removeFromCart,
  getCartProducts
};


