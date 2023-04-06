const { response } = require("express");
const { populate } = require("../models/Product");
// const Product = require("../models/Product");
const Product = require('../models/Product');
const Cart = require('../models/Cart')
const Subcategory = require("../models/Subcategory");
const img = require('../config/config')

const index = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 6;
  const page = parseInt(req.query.page, 10) || 1;
  Product.paginate({}, { limit, page, sort: { createdAt: -1 } })
  .then((response) => {
    res.json(response);
  })
  .catch((error) => {
    res.json({
      message: "Error",
    });
  });

};


const subcategory = async (req, res, next) => {
  const { subcategoryId } = req.params;
  const limit = parseInt(req.query.limit, 10) || 1;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;

  try {
    const [docs, totalDocs] = await Promise.all([
      Product.find({ subcategory: subcategoryId })
        .populate('category')
        .populate('subcategory')
        .skip(skip)
        .limit(limit),
      Product.countDocuments({ subcategory: subcategoryId })
    ]);

    if (docs.length === 0) {
      res.json({ message: 'No hay productos' });
    } else {
      const totalPages = Math.ceil(totalDocs / limit);
      const response = {
        docs: docs,
        totalDocs: totalDocs,
        limit: limit,
        totalPages: totalPages,
        page: page,
        pagingCounter: (page - 1) * limit + 1,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null
      };
      res.json(response);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al procesar la petición' });
  }
};

//show the list of products
// const index =(req, res, next)=> {
// const limit = parseInt(req.query.limit,10) ||10;
// const page =parseInt(req.query.page, 10) ||1;

//     Product.paginate({},{page:req.query.page, limit:req.query.limit})
//     .then(response=>{
//     res.json({
//         response
//         })
//     })
//     .catch(error=>{
//         res.json({
//             message:'Error'
//         })
//     })
// }
const show = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "NOT FOUND" });
  let products = req.body.products;
  return res.status(200).send({ products });
};
//add  new product

const store = (req, res, next) => {

  let name = req.body.name;
  
  Product.findOne({ name })
    .then(product => {
      if (!product) {
        let product = new Product({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          nutrition: req.body.nutrition,
          category: req.body.category,
          subcategory: req.body.subcategory,
          inCart: req.body.inCart,
          time: req.body.time,
          // images: [
          //   { data: req.files[0].buffer, contentType: req.files[0].mimetype },
          //   { data: req.files[1].buffer, contentType: req.files[1].mimetype },
          //   { data: req.files[2].buffer, contentType: req.files[2].mimetype }
          // ],
          ingredients: req.body.ingredients,
          totalCalories:req.body.totalCalories,
        });

        // Calcular el total de calorías
        // let totalCalories = 0;
        // for (let i = 0; i < product.ingredients.length; i++) {
        //   totalCalories += product.ingredients[i].calories;
        // }
        // product.totalCalories = totalCalories;

        if (req.file) {
          // const url = req.protocol + '://' + req.get('host')
          // product.image = url + '/uploads/' + req.file.filename

          //movil
          const IMG_BASE = process.env.IMG_BASE || "https://apifood-met.up.railway.app";
          const IMG_UPLOADS = process.env.IMG_UPLOADS || "/uploads/";
          const IMG_URL = IMG_BASE + IMG_UPLOADS + req.file.filename;
          const url = img
          // product.image  = url + '/uploads/' + req.file.filename
          product.image = IMG_URL;
        }

        product
          .save()
          .then(response => {
            res.json({
              message: "Product Added Successfully"
            });
          })
          .catch(error => {
            res.json({
              message: "An error occurred"
            });
          });
      } else {
        res.json({
          message: "The product is already registered in the database"
        });
      }
    })
};

const update = (req, res) => {

  if (req.body.error) return res.status(500).send({ error });
  if (!req.params.key) return res.status(404).send({ message: "NOT FOUND" });
  let product = req.params.key;
  product = Object.assign(product, req.body);
  product
    .save()
    .then((product) => res.status(200).send({ message: "UPDATED", product }))
    .catch((error) => res.status(500).send({ error }));


};

const remove = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "NOT FOUND" });
  req.body.products[0]
    .remove()
    .then((product) => res.status(200).send({ message: "REMOVED", product }))
    .catch((error) => res.status(500).send({ error }));
};

const removeByid = async (req, res) => {
  const { idproduct } = req.params;
  await Product.findByIdAndDelete(idproduct);
  res.json("producto elimininado")
};
const find = (req, res, next) => {
  let query = {};
  query[req.params.key] = new RegExp(req.params.value, 'i');
  Product.find(query)
    .then((products) => {
      if (!products.length) return next();
      req.body.products = products;
      return next();
    })
    .catch((error) => {
      req.body.error = error;
      next();
    });
};

const search = async (req, res, next) => {
  try {
    const products = await Product.find(
      {
        name: { $regex: `^${req.params.query}$`, $options: 'i' }
      }
    );
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error al procesar la peticion' })
  }
}

const searchProductByName = async (req, res) => {
  try {
    const { name } = req.query;
    const product = await Product.findOne({ name: { $regex: name, $options: 'i' } });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el producto' });
  }
};


// const subcategory = async (req, res, next) => {
//   const { subcategoryId } = req.params;
//   try {
//     const products = await Product.find({ subcategory: subcategoryId })
//       .populate('category')
//       .populate('subcategory');

//     if (products.length === 0) {
//       const response = {
//         // data: 'No hay productos',
//         // docs: 'Aquí va la documentación de la respuesta'
        
//       };
//       res.json({ message: 'No hay productos', });
//     } else {
//       const response = {
//         docs: products,
//         // docs: 'Aquí va la documentación de la respuesta'
//       };
//       res.json(response);
//     }
//   } catch (error) {
//     res.status(400).json({ message: 'Error al procesar la petición' });
//   }
// };


const category = async (req, res, next) => {
  const { categoryId } = req.params;
  const limit = parseInt(req.query.limit, 10) || 9;
  const page = parseInt(req.query.page, 10) || 1;

  try {
    const products = await Product.find({ category: categoryId })
      .populate('subcategory')
      .populate('category')
      .skip((page - 1) * limit)
      .limit(limit);

    if (products.length === 0) {
      res.json('No hay productos');
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al procesar la petición' });
  }
};

// const byid = async(req, res) => {
//   const {idproduct5} = req.params;
//   await Product.findById(idproduct);
//   res.json("producto elimininado")
// };


const buscar = async (req, res) => {
  const query = new RegExp(req.params.name, 'i'); // 'i' indica que ignore las mayúsculas y minúsculas
  Product.find({ name: query }).populate({
    path: "name"
  })
    .then(products => {
      if (!products || products.length === 0) {
        return res.status(404).send({
          message: "Products not found with name " + req.params.name
        });
      }
      res.send(products);
    }).catch(err => {
      return res.status(500).send({
        message: "Error retrieving products with name " + req.params.name
      });
    });
}



const getProductsCart = async (req, res) => {
  const products = await Product.find();

  if (Product) {
    res.json({ products });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }
};


// inicio Rutas movil
const indexMovil = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 6
  const page = parseInt(req.query.page, 10) || 1;

  Product.paginate({}, { limit, page, select: 'name price image nutrition' })
    .then((response) => {
      res.json(response.docs);
    })
    .catch((error) => {
      res.json({
        message: "Error 2",
      });
    });
};
//Fin Rutas movil




// ----------------------------------------------------------
// Suma de precio de los productos
const Contar = Product.find({}, (err, products) => {
  if (err) {
    // handle error
  } else {
    // map through products and extract prices
    const prices = products.map(product => product.price);
    // use reduce to sum prices
    const totalPrice = prices.reduce((acc, val) => acc + val, 0);
    // do something with totalPrice
  }
});


// Ejemplo:

const calculateCalories = async (req, res) => {
  const { productIds } = req.body;

  try {
    // Obtener los productos por ID y proyectar solo la propiedad de calorías
    const products = await Product.find(
      { _id: { $in: productIds } },
      { totalCalories: 1 }
    );

    // Sumar las calorías de todos los productos
    const totalCalories = products.reduce(
      (total, product) => total + product.totalCalories,
      0
    );

    res.json({ totalCalories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const productControllers = {};

// Función que obtiene los productos de la base de datos
const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos de la base de datos");
  }
};

productControllers.calculateCalories = async (req, res) => {
  try {
    const { products } = req.body;
    
    // Obtener los productos de la base de datos
    const dbProducts = await getProducts();
    
    // Sumar las calorías de los productos seleccionados
    let totalCalories = 0;
    products.forEach((product) => {
      const dbProduct = dbProducts.find((p) => p._id.toString() === product.id);
      if (dbProduct) {
        totalCalories += dbProduct.totalCalories;
      }
    });
    
    res.status(200).json({ totalCalories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al calcular las calorías" });
  }
};

const updateProduct = async (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};


// -------------------------------------------------------------------------------
module.exports = {
  updateProduct,
  index,
  show,
  store,
  find,
  remove,
  update,
  removeByid,
  search,
  subcategory,
  category,
  buscar,
  getProductsCart,
  calculateCalories,
  searchProductByName,
  indexMovil
};
