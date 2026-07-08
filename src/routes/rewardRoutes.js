const express = require('express');
const router = express.Router();
const { getRewards } = require('../controllers/rewardController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getRewards);

module.exports = router;
