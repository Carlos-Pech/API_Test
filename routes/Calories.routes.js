const express = require('express')
const router = express.Router()


const CalcularKcalorias= require('../controllers/CalcularKcalorias')


router.get('/total', CalcularKcalorias.TotalCalories)


module.exports =router;