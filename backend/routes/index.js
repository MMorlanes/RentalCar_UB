const express = require('express');
const authRoutes = require('./authRoutes');
const carRoutes = require('./carRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/cars', carRoutes);

module.exports = router;
