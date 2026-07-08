const express = require('express');
const router = express.Router();
const { getOffers } = require('../controllers/offerController');
const { protectUser } = require('../middlewares/authMiddleware');

router.get('/', protectUser, getOffers);

module.exports = router;
