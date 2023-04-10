const { response } = require("express");
const Client = require('../models/Client');

exports.createClient = (req, res) => {
    const name = req.body.name;

    const client = new Client({
    name: name,
    });

    client.save()
    .then(() => {
    res.status(201).json({ message: 'Client created successfully' });
    })
    .catch((error) => {
        res.status(500).json({ error: error });
    });
};// Controlador para guardar la mesa seleccionada por el usuario
exports.guardarMesaSeleccionada = async (req, res) => {
    const { id } = req.params;

    try {
        // Primero, obtén la mesa correspondiente al ID enviado por el cliente
        const mesa = await Client.findById(id);

        if (!mesa) {
            return res.status(404).json({ mensaje: "La mesa seleccionada no existe" });
        }

        // Actualiza el estado de la mesa a true
        mesa.status = true;
        await mesa.save();

        res.status(200).json({ mensaje: "Mesa seleccionada guardada con éxito", mesa });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al guardar la mesa seleccionada" });
    }
};

