const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router.get('/available', carController.getAvailableCars);
router.post('/reserve/:id', carController.reserveCar);

module.exports = router;
