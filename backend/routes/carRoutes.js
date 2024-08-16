const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/available', carController.getAvailableCars);
router.post('/reserve/:id', carController.reserveCar);

module.exports = router;
