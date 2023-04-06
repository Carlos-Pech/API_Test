const { response } = require("express");
const Ingredients = require("../models/Ingredients");
const Product = require("../models/Product");

const TotalCalories = async (req, res) => {
    const { name, category, ingredients } = req.body;

    //Inicializar variable para almacenar calorias totales
    let totalCalories = 0;

    //Iterar a través de los ingredientes y sumar las calorías de cada uno
    Ingredients.find({ name: { $in: ingredients } }, async (err, ingredientData) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Error al buscar ingredientes"
            });
        }
        ingredientData.forEach(ingredient => {
            totalCalories += ingredient.calories;
        });

        //Crear un nuevo producto
        let product = new Product({
            name: name,
            category: category,
            ingredients: ingredients,
            totalCalories: totalCalories
        });

        // Guardar el producto en la base de datos
        try {
            await product.save();
            return res.status(200).json({
                ok: true,
                product
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: "Error al guardar el producto"
            });
        }
    });
};

module.exports = { TotalCalories };

