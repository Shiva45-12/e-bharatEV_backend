const express = require('express');
const router = express.Router();
const {
  createOrder,
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  rescheduleBooking,
  getAllBookingsAdmin,
  updateBookingStatusAdmin,
} = require('../controllers/bookingController');
const { protect, protectUser } = require('../middlewares/authMiddleware');

// User routes
router.post('/create-order', protectUser, createOrder);
router.post('/', protectUser, createBooking);
router.get('/my', protectUser, getMyBookings);
router.get('/:id', protectUser, getBookingById);
router.put('/:id/cancel', protectUser, cancelBooking);
router.put('/:id/reschedule', protectUser, rescheduleBooking);

// Admin routes
router.get('/admin/all', protect, getAllBookingsAdmin);
router.put('/admin/:id/status', protect, updateBookingStatusAdmin);

module.exports = router;
