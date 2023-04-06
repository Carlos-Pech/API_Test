
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')




const ingredientsSchema = new Schema
    (
        {
            name:
            {
                type: String
            },

            calories:
            {
                type: Number
            },
            familia:
            {
                type: String
            },
            status: {
                type: Boolean, default: true        
            },
            unidad: {
                type: String        
            }

        }
    )
ingredientsSchema.plugin(mongoosePaginate)
const Ingredients = mongoose.model('Ingredients', ingredientsSchema);
module.exports = Ingredients