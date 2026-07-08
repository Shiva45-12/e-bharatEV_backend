const express = require('express');
const router = express.Router();
const { getOffers } = require('../controllers/offerController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getOffers);

module.exports = router;
