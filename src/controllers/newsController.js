const News = require('../models/News');

// @desc    Get all published news (for app users)
// @route   GET /api/news
// @access  Private (user)
const getPublishedNews = async (req, res) => {
  try {
    const news = await News.find({ isPublished: true }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, count: news.length, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all news (for admin)
// @route   GET /api/news/admin
// @access  Private (admin)
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: news.length, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create news article
// @route   POST /api/news
// @access  Private (admin)
const createNews = async (req, res) => {
  try {
    const { title, summary, content, imageUrl, category, source, isPublished } = req.body;
    if (!title || !summary) {
      return res.status(400).json({ success: false, message: 'Title and summary are required' });
    }
    const news = await News.create({ title, summary, content, imageUrl, category, source, isPublished });
    res.status(201).json({ success: true, data: news, message: 'News article created successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update news article
// @route   PUT /api/news/:id
// @access  Private (admin)
const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.status(200).json({ success: true, data: news, message: 'News updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete news article
// @route   DELETE /api/news/:id
// @access  Private (admin)
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.status(200).json({ success: true, message: 'News deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getPublishedNews, getAllNews, createNews, updateNews, deleteNews };
