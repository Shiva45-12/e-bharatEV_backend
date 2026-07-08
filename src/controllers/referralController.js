const User = require('../models/User');

// @desc    Get referral statistics and code
// @route   GET /api/referral/stats
// @access  Private
const getReferralStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // If user doesn't have a referral code yet, create one
    if (!user.referralCode) {
      user.referralCode = `EV${user.name.substring(0, 3).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
      await user.save();
    }

    // Count how many users have used this referral code
    const friendsReferred = await User.countDocuments({ referredBy: user._id });

    // Mock data for rewards earned via referral
    const totalEarned = friendsReferred * 50;

    res.json({
      success: true,
      data: {
        referralCode: user.referralCode,
        friendsReferred,
        totalEarned
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getReferralStats
};
