const { response } = require("express");
const Subcategory = require("../models/Subcategory");

const index = (req, res, next) => {
  const limit = parseInt(req.query.limit, 1 ) || 12;
  const page = parseInt(req.query.page, 10) || 1;

  Subcategory.paginate({}, { limit, page })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "Error",
      });
    });
};


const add= async (req, res)=>{
  const {name,categoryId}= req.body
  if(!name||!categoryId)
  {
    return res.status(400).send(
      {
        message:"Faltan datos por completar"
      }
    )
  }

  let subcategory = await Subcategory
  ({

    name,
    category:categoryId
  })
  await subcategory.save()
  return res.status(200).send({
    succes:true,
    message:"correcto"
  })
}

const view = async(req,res)=>
{
  const {id}=req.params
  let subcategory = await Subcategory.findById(id).populate({path:"category"})

  if(!subcategory)
  {
    return res.status(404).send
    (
      {
        message:"NO"
      }
    )
  }
  return res.status(200).send(
    {
      succes :true,
      message:"Si",
      subcategory

    }
  )
}

const show = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.subcategory) return res.status(404).send({ message: "NOT FOUND" });
  let subcategory = req.body.subcategory;
  return res.status(200).send({ subcategory });
};
//add  new product
const store = (req, res, next) => {
  let subcategory = new Subcategory({
    name: req.body.name,
    category : req.body.categoryId
  });
  // if (req.file) {
  //   product.image = req.file.path;
  // }
  subcategory
    .save()
    .then((response) => {
      res.json({
        message: "Category Added Succesfully",
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
  Subcategory.find(query)
    .then((subcategory) => {
      if (!subcategory.length) return next();
      req.body.subcategory = subcategory;
      return next();
    })
    .catch((error) => {
      req.body.error = error;
      next();
    });
};

const search=async(req, res, next)=>{
  try {
    const subcategory = await Subcategory.find(
      {
        name:new RegExp(req.params.query, 'i'),
        
      }
    );
    res.json(subcategory);
  } catch (error) {
    res.status(400).json({message:'Error al procesar la peticion'})
  }
}
const category=async(req, res, next)=>{
  try {
    const products = await Product.find(
      {
        category:new RegExp(req.params.query, 'i'),
        
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



const buscar = async (req, res) => {
  Subcategory.findById(req.params.id).populate({
    path: "category"
  })
    .then(subcategory => {
      if (!subcategory) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      res.send(subcategory);
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
  search,
  category,
  view
};
