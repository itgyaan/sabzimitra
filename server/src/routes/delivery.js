import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /delivery/partners
router.get('/partners', (req, res) => {
  return res.json({
    success: true,
    partners: db.deliveryPartners
  });
});

// GET /delivery/active-trips
router.get('/active-trips', (req, res) => {
  const activeOrders = db.orders.filter(o => ['PACKED', 'PICKED_UP', 'OUT_FOR_DELIVERY'].includes(o.status));
  return res.json({
    success: true,
    trips: activeOrders
  });
});

// PATCH /delivery/status-toggle
router.patch('/status-toggle', (req, res) => {
  const { partnerId = 'dlv-01', isOnline } = req.body;
  const partner = db.deliveryPartners.find(p => p.id === partnerId);
  if (partner) {
    partner.isOnline = isOnline !== undefined ? isOnline : !partner.isOnline;
    return res.json({ success: true, partner });
  }
  return res.status(404).json({ success: false, message: 'Partner not found' });
});

// POST /delivery/verify-otp
router.post('/verify-otp', (req, res) => {
  const { orderId, otp, partnerId = 'dlv-01' } = req.body;
  const order = db.orders.find(o => o.id === orderId || o.orderNumber === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (order.deliveryOtp !== otp) {
    return res.status(400).json({ success: false, message: 'Incorrect Delivery OTP. Ask customer for 4-digit code.' });
  }

  order.status = 'DELIVERED';
  order.deliveredAt = new Date().toISOString();

  // Credit delivery partner
  const partner = db.deliveryPartners.find(p => p.id === partnerId);
  if (partner) {
    partner.tripsToday += 1;
    partner.earningsToday += 45; // base payout + tip
  }

  return res.json({
    success: true,
    message: 'Delivery confirmed and fulfilled successfully!',
    order
  });
});

export default router;
