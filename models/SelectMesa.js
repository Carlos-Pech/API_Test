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
    }],
    status: {
        type: Boolean,
        default: false
    }
});

const MesaSelect = mongoose.model('MesaSelect', mesaSchema);

module.exports = MesaSelect;
