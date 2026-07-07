const express = require('express');
const router = express.Router();
const { registerVehicle, getUserVehicles } = require('../controllers/vehicleController');
const { protectUser } = require('../middlewares/authMiddleware'); 

router.post('/', protectUser, registerVehicle);
router.get('/', protectUser, getUserVehicles);

module.exports = router;
