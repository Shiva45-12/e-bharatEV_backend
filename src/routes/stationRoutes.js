const express = require('express');
const router = express.Router();
const {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation
} = require('../controllers/stationController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, createStation)
  .get(protect, getAllStations);

router.route('/:id')
  .get(protect, getStationById)
  .put(protect, updateStation)
  .delete(protect, deleteStation);

module.exports = router;
