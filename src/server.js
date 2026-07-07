require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true,
}));
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));
app.use(morgan('dev'));

// Serve Uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const stationRoutes = require('./routes/stationRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const franchiseRoutes = require('./routes/franchiseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const refundRoutes = require('./routes/refundRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const carbonRoutes = require('./routes/carbonRoutes');
const govRoutes = require('./routes/govRoutes');
const heatmapRoutes = require('./routes/heatmapRoutes');
const cityAnalyticsRoutes = require('./routes/cityAnalyticsRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const supportRoutes = require('./routes/supportRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const reportRoutes = require('./routes/reportRoutes');
const auditRoutes = require('./routes/auditRoutes');
const securityRoutes = require('./routes/securityRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/station', stationRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/franchise', franchiseRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/refund', refundRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/analytics/city', cityAnalyticsRoutes);
app.use('/api/carbon', carbonRoutes);
app.use('/api/gov', govRoutes);
app.use('/api/heatmap', heatmapRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/dashboard', dashboardRoutes);
// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
