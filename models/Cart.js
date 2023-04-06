// const mongoose  = require('mongoose')
// const Schema    =mongoose.Schema
// const mongoosePaginate = require('mongoose-paginate-v2')

// const subSchema = new mongoose.Schema({
    
//     kilocalorias: { type: Number },
//     ingredients: 
//     {
//         type:mongoose.Types.ObjectId,
//         ref:"Ingredients"
//     }  
// })
// const Gramos = mongoose.model('Gramos', subSchema);


// const CartSchema = new Schema({
//     name:{
//         type:String
//     },
//     amount:{
//         type:Number
//     },
//     carbohidratos:{
//         type:Number
//     },
//     proteins:{
//         type:Number 
//     },
//     grasas:{
//         type:Number
//     },
//     image:{
//         type:String
//     },
//     ingredients: 
//     [subSchema]
    
// },{timestamps:true}) 

// CartSchema.plugin(mongoosePaginate)
// const Cart = mongoose.model('Cart', CartSchema)
// module.exports=Cart,Gramos