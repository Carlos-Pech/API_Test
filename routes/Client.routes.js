const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

router.post('/clientAdd', clientController.createClient);
router.post('/:id/seleccionada',clientController.guardarMesaSeleccionada);//Para seleccionar una mesa 

module.exports = router;
