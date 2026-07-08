const express = require('express');
const router = express.Router();
const { getOffers, createOffer, updateOffer, deleteOffer } = require('../controllers/offerController');
const { protectUser, protect } = require('../middlewares/authMiddleware');

router.get('/', protectUser, getOffers);
router.post('/', protect, createOffer);
router.put('/:id', protect, updateOffer);
router.delete('/:id', protect, deleteOffer);

module.exports = router;
