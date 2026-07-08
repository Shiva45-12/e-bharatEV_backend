const Article = require('../models/Article');
const SupportSettings = require('../models/SupportSettings');
const OpenAI = require('openai');

let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

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

// @desc    Chat with AI Support
// @route   POST /api/support/chat
// @access  Public
const chatWithSupport = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    if (!openai) {
      return res.status(200).json({
        success: true,
        reply: "Sorry, the AI support is currently offline (Missing API Key). Please try again later or call our helpline."
      });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful customer support assistant for Bharat EV Prime, an electric vehicle charging station network in India. Provide short, concise, and helpful answers in Hindi and English (Hinglish).' },
        { role: 'user', content: message }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      reply: reply
    });

  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process chat request.',
      reply: "I am having trouble connecting right now. Please try again later."
    });
  }
};

module.exports = {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  getSettings,
  updateSettings,
  chatWithSupport
};
