const { response } = require("express");
const Nutrition = require("../models/Nutrition");


const index = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;

  Nutrition.paginate({}, { limit, page })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "Error",
      });
    });
};


const show = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.nutrition) return res.status(404).send({ message: "NOT FOUND" });
  let nutrition = req.body.nutrition;
  return res.status(200).send({ nutrition });
};
//add  new product
const store = (req, res, next) => {
  let nutrition = new Nutrition({
    name: req.body.name,
  });
  // if (req.file) {
  //   product.image = req.file.path;
  // }
  nutrition
    .save()
    .then((response) => {
      res.json({
        message: "Nutrition Added Succesfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error ocurrred",
      });
    });
};

const update = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "NOT FOUND" });
  let product = req.body.products[0];
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

const removeByid = async(req, res) => {
  const {idproduct} = req.params;
  await Product.findByIdAndDelete(idproduct);
  res.json("producto elimininado")
};
const find = (req, res, next) => {
  let query = {};
  query[req.params.key] = new RegExp (req.params.value, 'i');
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

const search=async(req, res, next)=>{
  try {
    const products = await Product.find(
      {
        name:new RegExp(req.params.query, 'i'),
        
      }
    );
    res.json(products);
  } catch (error) {
    res.status(400).json({message:'Error al procesar la peticion'})
  }
}
const add=async(req, res, next)=>{
  try {
    const products = await Product.find(
      {
        Nutrition:new RegExp(req.params.query, 'i'),
        
      }
    );
    if(products=="")
    {
      res.json('No hay productos')
    }
    else{

      res.json(products);
    }
  } catch (error) {
    res.status(400).json({message:'Error al procesar la peticion'})
  }
}

const getById = async (req, res) => {
  Nutrition.findById(req.params.id)
    .then(Nutrition => {
      if (!Nutrition) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      res.send(Nutrition);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving product with id " + req.params.id
      });
    });
}
module.exports = {
  index,
  show,
  store,
  find,
  remove,
  update,
  removeByid,
  getById

};