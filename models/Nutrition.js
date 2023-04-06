const mongoose =  require ('mongoose')
const Schema  =mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')


const NutritionTypeSchema = new Schema 
(
    {
        name:
        {
            type:String
        }
    }
)
NutritionTypeSchema.plugin(mongoosePaginate)
const Nutrition = mongoose.model('Nutrition', NutritionTypeSchema);
module.exports= Nutrition
