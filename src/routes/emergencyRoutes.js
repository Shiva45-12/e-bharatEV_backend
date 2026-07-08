const express = require('express');
const router = express.Router();
const { raiseSOS } = require('../controllers/emergencyController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/sos', protect, raiseSOS);

module.exports = router;
