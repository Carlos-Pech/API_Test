const Mesa = require("../models/Table");

// Controlador para crear una nueva mesa
crearMesa = async (req, res) => {
    const { nombre } = req.body;

    try {
        const mesa = await Mesa.create({ nombre });
        res.status(201).json({ mensaje: "Mesa creada", mesa });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al crear la mesa" });
    }
};

// Controlador para agregar un nuevo cliente a una mesa existente
agregarCliente = async (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;

    try {
        const mesa = await Mesa.findById(id);
        if (!mesa) {
        return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }

        mesa.clientes.push({ nombre });
        await mesa.save();

        res.status(201).json({ mensaje: "Cliente agregado a la mesa", mesa });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al agregar el cliente a la mesa" });
    }
};
const getMesaById = async (req, res) => {
    const { id } = req.params;

    try {
        const mesa = await Mesa.findById(id).populate("clientes");
        if (!mesa) {
        return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }

        res.status(200).json(mesa);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener la mesa" });
    }
};
module.exports = {
crearMesa,
agregarCliente,
getMesaById,
};
