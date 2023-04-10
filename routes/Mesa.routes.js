const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/MesaController');

// Ruta para crear una nueva mesa
router.post('/addMesas', mesaController.crearMesa);
router.get('/mesas',mesaController.getMesas)
router.post('/:id/seleccionada',mesaController.guardarMesaSeleccionada);//Para seleccionar una mesa 
// Ruta para agregar un nuevo cliente a una mesa existente
router.post('/mesas/:id/clientes', mesaController.agregarCliente);//Agregar cliente en mesa
router.get('/obtener/:id',mesaController.getMesaById)
router.delete("/mesas/:mesaId/clientes/:clienteId",mesaController.eliminarCliente)//Elimminar cliente de una mesa
router.delete('/mesas/:id',mesaController.eliminarMesa)//ELiminar una mesa
router.put('/mesas/:idMesa/clientes/:idCliente',mesaController.editarCliente)
router.put('/mesas/:id/seleccionar', mesaController.seleccionarMesa)
router.put('/mesas/:id/liberar', mesaController.liberarMesa)


// pruebas para elejir mesa
router.post('/mesa/seleccionar', mesaController.selectTable);
module.exports = router;
