const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/MesaController');

// Ruta para crear una nueva mesa
router.post('/addMesas', mesaController.crearMesa);
router.get('/mesas',mesaController.getMesas)
// Ruta para agregar un nuevo cliente a una mesa existente
router.post('/mesas/:id/clientes', mesaController.agregarCliente);
router.get('/obtener/:id',mesaController.getMesaById)
router.delete("/mesas/:mesaId/clientes/:clienteId",mesaController.eliminarCliente)//Elimminar cliente de una mesa
router.delete('/mesas/:id',mesaController.eliminarMesa)//ELiminar una mesa
router.put('/mesas/:idMesa/clientes/:idCliente',mesaController.editarCliente)

module.exports = router;
