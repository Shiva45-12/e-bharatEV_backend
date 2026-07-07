const Article = require('../models/Article');
const SupportSettings = require('../models/SupportSettings');

// --- ARTICLES ---

// @desc    Get all articles
// @route   GET /api/support/articles
// @access  Public or Admin
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add new article
// @route   POST /api/support/articles
// @access  Admin
const addArticle = async (req, res) => {
  try {
    const { title, category, content, status, isPopular } = req.body;

    const article = new Article({
      title,
      category,
      content,
      status: status || 'Published',
      isPopular: isPopular || false
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update article
// @route   PUT /api/support/articles/:id
// @access  Admin
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      article.title = req.body.title || article.title;
      article.category = req.body.category || article.category;
      article.content = req.body.content || article.content;
      article.status = req.body.status || article.status;
      
      if (req.body.isPopular !== undefined) {
        article.isPopular = req.body.isPopular;
      }

      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete article
// @route   DELETE /api/support/articles/:id
// @access  Admin
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      await article.deleteOne();
      res.json({ message: 'Article removed' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// --- SETTINGS ---

// @desc    Get support settings
// @route   GET /api/support/settings
// @access  Public or Admin
const getSettings = async (req, res) => {
  try {
    let settings = await SupportSettings.findOne();
    if (!settings) {
      settings = await SupportSettings.create({}); // Create default if missing
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update support settings
// @route   PUT /api/support/settings
// @access  Admin
const updateSettings = async (req, res) => {
  try {
    let settings = await SupportSettings.findOne();
    if (!settings) {
      settings = new SupportSettings(req.body);
    } else {
      settings.email = req.body.email || settings.email;
      settings.phone = req.body.phone || settings.phone;
      settings.liveChatUrl = req.body.liveChatUrl || settings.liveChatUrl;
      settings.timing = req.body.timing || settings.timing;
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  getSettings,
  updateSettings
};
