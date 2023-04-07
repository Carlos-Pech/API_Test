const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/TableController');

// Ruta para crear una nueva mesa
router.post('/addMesas', mesaController.crearMesa);

// Ruta para agregar un nuevo cliente a una mesa existente
router.post('/mesas/:id/clientes', mesaController.agregarCliente);
router.get('/obtener/:id',mesaController.getMesaById)
router.delete("/mesas/:mesaId/clientes/:clienteId",mesaController.eliminarCliente)//Elimminar cliente de una mesa
router.delete('/mesas/:id',mesaController.eliminarMesa)//ELiminar una mesa

module.exports = router;
