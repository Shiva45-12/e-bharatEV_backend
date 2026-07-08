const express = require('express');
const router = express.Router();
const { getReferralStats } = require('../controllers/referralController');
const { protectUser } = require('../middlewares/authMiddleware');

router.get('/stats', protectUser, getReferralStats);

module.exports = router;
