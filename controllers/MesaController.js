const Mesa = require("../models/Mesa");
const Cart = require('../models/Cart2')

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
const agregarCliente = async (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;

    try {
        const mesa = await Mesa.findById(id);
        if (!mesa) {
            return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }

        const nuevoCliente = { nombre };
        mesa.clientes.push(nuevoCliente);
        await mesa.save();

        res.status(201).json({ mensaje: "Cliente agregado a la mesa", mesa });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al agregar el cliente a la mesa" });
    }
};

// Controlador para editar los datos de un cliente en una mesa existente
const editarCliente = async (req, res) => {
    const { idMesa, idCliente } = req.params;
    const { nombre } = req.body;

    try {
        const mesa = await Mesa.findById(idMesa);
        if (!mesa) {
            return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }

        const clienteIndex = mesa.clientes.findIndex(cliente => cliente._id == idCliente);
        if (clienteIndex === -1) {
            return res.status(404).json({ mensaje: "Cliente no encontrado en la mesa" });
        }

        mesa.clientes[clienteIndex].nombre = nombre;
        await mesa.save();

        res.status(200).json({ mensaje: "Datos del cliente actualizados", mesa });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar los datos del cliente" });
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

// obtener las mesas cons sus clientes
const getMesas = async (req, res) => {
    try {
        const mesas = await Mesa.find().populate("clientes");
        const response={
            docs:
                mesas
            
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener las mesas" });
    }
};

//Eliminar cliente de una mesa 
const eliminarCliente = async (req, res) => {
    const { mesaId, clienteId } = req.params;
    try {
        const mesa = await Mesa.findById(mesaId);
        console.log(mesa)
        if (!mesa) {
            return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }
    
        // Buscar el cliente dentro del array de clientes de la mesa
        const clienteIndex = mesa.clientes.findIndex((cliente) => cliente._id.toString() === clienteId);
        if (clienteIndex === -1) {
            return res.status(404).json({ mensaje: "Cliente no encontrado en la mesa" });
        }
    
        // Eliminar el cliente del array de clientes
        mesa.clientes.splice(clienteIndex, 1);
    
        // Guardar los cambios en la base de datos
        await mesa.save();
    
        // Eliminar el carrito del cliente de la base de datos
        await Cart.deleteOne({ cliente: clienteId });
    
        res.status(200).json({ mensaje: "Cliente eliminado de la mesa y carrito eliminado", mesa });
        } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al eliminar el cliente de la mesa" });
        console.log(error)
    }
};

//Eliminar mesa
const eliminarMesa = async (req, res) => {
    const { id } = req.params;

    try {
    const mesa = await Mesa.findByIdAndDelete(id);
    if (!mesa) {
    return res.status(404).json({ mensaje: "Mesa no encontrada" });
    }

    res.status(200).json({ mensaje: "Mesa eliminada", mesa });
    } catch (error) {
    console.log(error);
res.status(500).json({ mensaje: "Error al eliminar la mesa" });
}
};
module.exports = {
    crearMesa,
    agregarCliente,
    getMesaById,
    eliminarCliente,
    eliminarMesa,
    editarCliente,
    getMesas
};
