import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import vendorRoutes from './routes/vendors.js';
import deliveryRoutes from './routes/delivery.js';
import couponRoutes from './routes/coupons.js';
import paymentRoutes from './routes/payments.js';
import adminRoutes from './routes/admin.js';
import analyticsRoutes from './routes/analytics.js';
import { db } from './data/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Determine frontend public/dist directory
const publicDir = fs.existsSync(path.join(__dirname, '../public'))
  ? path.join(__dirname, '../public')
  : path.join(__dirname, '../../client/dist');

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    name: 'SabziMitra API Gateway',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Notifications feed
app.get('/api/notifications', (req, res) => {
  res.json({
    success: true,
    notifications: db.notifications
  });
});

// Mount modular sub-routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handling Fallback
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// SPA Fallback: Serve index.html for all non-API GET requests
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

// 404 Route for unhandled routes/APIs
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🥬 SabziMitra API Server running live on http://localhost:${PORT}`);
});

