const mongoose  = require('mongoose')
const Schema    =mongoose.Schema

const subSchema = new Schema({
    kilocalorias: { type: Number },
    ingredients: 
        {
        type:mongoose.Types.ObjectId,
        ref:"Ingredients"
        }
    
});
const Product2 = mongoose.model('Ingredient2', subSchema)
module.exports=Product2
