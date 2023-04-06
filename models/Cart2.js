const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  mesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mesa',
    required: true
  },
  Products: [{
    name: String,
    description: String,
    price: Number,
    totalCalories: Number, // agregado
    inCart: Boolean,
    nutrition: Boolean,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory"
    },
    status: Boolean,
    image: String,
    time: Number
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
