const Offer = require('../models/Offer');

// @desc    Get all active offers
// @route   GET /api/offers
// @access  Private
const getOffers = async (req, res) => {
  try {
    let offers = await Offer.find({ isActive: true, validUntil: { $gte: new Date() } }).sort({ createdAt: -1 });

    // Seed default offers if empty for testing
    if (offers.length === 0) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      await Offer.insertMany([
        { title: 'Welcome Bonus', description: 'Get 20% off on your first charge.', code: 'WELCOME20', discountType: 'PERCENTAGE', discountValue: 20, validUntil: nextMonth },
        { title: 'Weekend Special', description: 'Flat ₹50 off on charging this weekend.', code: 'WEEKEND50', discountType: 'FLAT', discountValue: 50, validUntil: nextMonth },
        { title: 'Mega Saving', description: 'Get 10% off up to ₹100.', code: 'SAVE10', discountType: 'PERCENTAGE', discountValue: 10, validUntil: nextMonth }
      ]);
      offers = await Offer.find({ isActive: true, validUntil: { $gte: new Date() } }).sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      data: offers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getOffers
};
