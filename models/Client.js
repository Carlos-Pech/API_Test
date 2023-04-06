const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: { type: String, required: true },

});

const Client = mongoose.model("Cliente", clientSchema);

module.exports = Client;
