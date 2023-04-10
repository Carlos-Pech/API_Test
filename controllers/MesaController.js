const Mesa = require("../models/Mesa");
const Cart = require('../models/Cart2')
const MesaSelect =require('../models/SelectMesa')



// Controlador para crear una nueva mesa
const crearMesa = async (req, res) => {
    const { nombre } = req.body;

    try {
        const mesa = await Mesa.create({ 
            nombre, 
            mesaSeleccionada: '' // Agregar campo mesaSeleccionada
        });
        res.status(201).json({ mensaje: "Mesa creada", mesa });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al crear la mesa" });
    }
};

// Controlador para seleccionar una mesa
const selectTable = async (req, res) => {
    const { table } = req.body;
    try {
        const mesa = await Mesa.findOneAndUpdate(
            { nombre: table },
            { status: true, mesaSeleccionada: table },
            { new: true }
        );
        res.status(200).json({ mensaje: `Mesa ${table} seleccionada`, mesa });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al seleccionar la mesa" });
    }
};


//este aun no esta bien

// Controlador para seleccionar una mesa y actualizar su estado a "ocupada"
const seleccionarMesa = async (req, res) => {
    const { id } = req.params;

    try {
        const mesa = await Mesa.findById(id);
        if (!mesa) {
            return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }
        if (mesa.status) {
            return res.status(400).json({ mensaje: "La mesa ya está ocupada" });
        }
        mesa.status = true;
        await mesa.save();
        res.status(200).json({ mensaje: "Mesa seleccionada", mesa, id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al seleccionar la mesa" });
    }
};
// Controlador para marcar una mesa como disponible
const liberarMesa = async (req, res) => {
    const { id } = req.params;

    try {
        const mesa = await Mesa.findById(id);
        if (!mesa) {
            return res.status(404).json({ mensaje: "Mesa no encontrada" });
        }
        if (!mesa.status) {
            return res.status(400).json({ mensaje: "La mesa ya está disponible" });
        }
        if (mesa.mesaSeleccionada && mesa.mesaSeleccionada !== mesa.nombre) {
            return res.status(400).json({ mensaje: "La mesa aún está seleccionada por otro cliente" });
        }
        mesa.status = false;
        mesa.mesaSeleccionada = '';
        await mesa.save();
        
        res.status(200).json({ mensaje: "Mesa liberada", mesa });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al liberar la mesa" });
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
// Controlador para guardar la mesa seleccionada por el usuario
const guardarMesaSeleccionada = async (req, res) => {
    const { id } = req.params;

    try {
        // Primero, obtén la mesa correspondiente al ID enviado por el cliente
        const mesaOriginal = await Mesa.findById(id);

        if (!mesaOriginal) {
            return res.status(404).json({ mensaje: "La mesa seleccionada no existe" });
        }

        // Crea una copia de la mesa en el modelo MesaSelect y agrega sus clientes
        const mesaSelect = await MesaSelect.create({
            nombre: mesaOriginal.nombre,
            clientes: mesaOriginal.clientes,
            status: true
        });

        // Actualiza el estado de la mesa original a "ocupado"
        mesaOriginal.status = true;
        await mesaOriginal.save();

        res.status(200).json({ mensaje: "Mesa seleccionada guardada con éxito", mesaSelect });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al guardar la mesa seleccionada" });
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
    getMesas,
    seleccionarMesa,
    liberarMesa,
    guardarMesaSeleccionada,
    selectTable
};
