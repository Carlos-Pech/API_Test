const mongoose = require('mongoose');

const mesaSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true
  },
  clientes: [{
    nombre: {
        type: String,
        required: true
    }
  }]
});

const Mesa = mongoose.model('Mesa', mesaSchema);

module.exports = Mesa;
