const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/TableController');

// Ruta para crear una nueva mesa
router.post('/mesas', mesaController.crearMesa);

// Ruta para agregar un nuevo cliente a una mesa existente
router.post('/mesas/:id/clientes', mesaController.agregarCliente);
router.get('/obtener/:id',mesaController.getMesaById)

module.exports = router;
