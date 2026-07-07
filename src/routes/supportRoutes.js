const express = require('express');
const router = express.Router();
const { 
  getArticles, 
  addArticle, 
  updateArticle, 
  deleteArticle,
  getSettings,
  updateSettings
} = require('../controllers/supportController');
const { protect } = require('../middlewares/authMiddleware');

// Articles
router.route('/articles')
  .get(getArticles)
  .post(protect, addArticle);

router.route('/articles/:id')
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

// Settings
router.route('/settings')
  .get(getSettings)
  .put(protect, updateSettings);

module.exports = router;
