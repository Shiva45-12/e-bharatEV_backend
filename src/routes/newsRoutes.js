const express = require('express');
const router = express.Router();
const { getPublishedNews, getAllNews, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protectUser, protect } = require('../middlewares/authMiddleware');

// User routes
router.get('/', protectUser, getPublishedNews);

// Admin routes
router.get('/admin', protect, getAllNews);
router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;
