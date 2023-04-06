const { response } = require("express");
const Ingredients = require('../models/Ingredients');

const index = (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 200;
    const page = parseInt(req.query.page, 10) || 1;

    Ingredients.paginate({}, { limit, page })
        .then((ingredients) => {
            res.json(ingredients);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error",
                error
            });
        });
};

const show = (req, res) => {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.ingredients) return res.status(404).send({ message: "NOT FOUND" });
    let ingredients = req.body.ingredients;
    return res.status(200).send({ ingredients });
};

const store = (req, res) => {
    let ingredient = new Ingredients({
        name: req.body.name,
        calories: req.body.calories,
        status: req.body.status,
        familia: req.body.familia,
        unidad: req.body.unidad
    });

    ingredient
        .save()
        .then((ingredient) => {
            res.status(201).json({
                message: "Ingredient Added Succesfully",
                ingredient
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "An error occurred",
                error
            });
        });
};

const update = (req, res) => {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.ingredients) return res.status(404).send({ message: "NOT FOUND" });
    let ingredient = req.body.ingredients[0];
    ingredient = Object.assign(ingredient, req.body);
    ingredient
        .save()
        .then((ingredient) => res.status(200).send({ message: "UPDATED", ingredient }))
        .catch((error) => res.status(500).send({ error }));
};

const remove = (req, res) => {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.ingredients) return res.status(404).send({ message: "NOT FOUND" });
    req.body.ingredients[0]
        .remove()
        .then((ingredient) => res.status(200).send({ message: "REMOVED", ingredient }))
        .catch((error) => res.status(500).send({ error }));
};

const removeById = async (req, res) => {
    const { idingredients } = req.params;
    await Ingredients.findByIdAndDelete(idingredients);
    res.json("Ingredient removed");
};
const find = (req, res, next) => {
    let query = {};
    query[req.params.key] = new RegExp(req.params.value, "i");
    Ingredients.find(query)
        .then((ingredients) => {
            if (!ingredients.length) return next();
            req.body.ingredients = ingredients;
            return next();
        })
        .catch((error) => {
            req.body.error = error;
            next();
        });
};

const search = async (req, res, next) => {
    try {
        const ingredients = await Ingredients.find({
            name: new RegExp(req.params.query, "i"),
        });
        res.json(ingredients);
    } catch (error) {
        res.status(400).json({ message: "Error al procesar la petición" });
    }
};
const category = async (req, res, next) => {
    try {
        const ingredients = await Ingredients.find({
            category: new RegExp(req.params.query, "i"),
        });
        if (!ingredients.length) {
            res.json("No hay ingredientes");
        } else {
            res.json(ingredients);
        }
    } catch (error) {
        res.status(400).json({ message: "Error al procesar la petición" });
    }
};
const buscar = async (req, res) => {
    Ingredients.findById(req.params.id)
        .then(ingredient => {
            if (!ingredient) {
                return res.status(404).send({
                    message: "Ingrediente no encontrado con id " + req.params.id
                });
            }
            res.send(ingredient);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Ingrediente no encontrado con id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error al obtener el ingrediente con id " + req.params.id
            });
        });
};

const updateIngredient = async (req, res) => {
    Ingredients.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, function (err, ingredient) {
        if (err) return next(err);
        res.send(ingredient);
    });
};

module.exports = {
    index,
    updateIngredient,
    show,
    store,
    find,
    remove,
    buscar,
    removeById,
    search,
    category,
};
