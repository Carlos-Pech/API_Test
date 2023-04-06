const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

router.post('/clientAdd', clientController.createClient);

module.exports = router;
