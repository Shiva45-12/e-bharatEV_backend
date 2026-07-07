const Vehicle = require('../models/Vehicle');

// @desc    Register a new vehicle for a user
// @route   POST /api/vehicle
// @access  Private (User)
exports.registerVehicle = async (req, res) => {
  try {
    const { brand, model, registrationNumber, connectorType } = req.body;

    if (!brand || !model || !registrationNumber || !connectorType) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const vehicle = await Vehicle.create({
      user: req.user.id,
      brand,
      model,
      registrationNumber,
      connectorType
    });

    res.status(201).json({
      success: true,
      message: 'Vehicle registered successfully',
      data: vehicle
    });
  } catch (error) {
    console.error('Error registering vehicle:', error);
    res.status(500).json({ success: false, message: 'Server error while registering vehicle' });
  }
};

// @desc    Get all vehicles for logged in user
// @route   GET /api/vehicle
// @access  Private (User)
exports.getUserVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user.id });
    
    res.status(200).json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching vehicles' });
  }
};
