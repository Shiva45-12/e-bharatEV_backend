const express = require('express');
const router = express.Router();
const { registerVehicle, getUserVehicles } = require('../controllers/vehicleController');
const { protect } = require('../middlewares/authMiddleware'); // assuming there's an authMiddleware for users

router.post('/', protect, registerVehicle);
router.get('/', protect, getUserVehicles);

module.exports = router;
