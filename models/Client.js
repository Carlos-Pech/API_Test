// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const clientSchema = new Schema({
//     nombre: { type: String, required: true },

// });

// const Client = mongoose.model("Cliente", clientSchema);

// module.exports = Client;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    // ...
});

// Agregar hook post remove
clienteSchema.post('remove', async function (doc, next) {
  try {
    const Cart = mongoose.model('Cart');
    // Eliminar el carrito del cliente de la base de datos
    await Cart.deleteOne({ cliente: doc._id });
    next();
  } catch (error) {
    next(error);
  }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
