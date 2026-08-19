import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /orders (Query with role / user filter)
router.get('/', (req, res) => {
  const { vendorId, customerId, status } = req.query;
  let list = [...db.orders];

  if (vendorId) list = list.filter(o => o.vendorId === vendorId);
  if (customerId) list = list.filter(o => o.customerId === customerId);
  if (status) list = list.filter(o => o.status === status);

  return res.json({
    success: true,
    count: list.length,
    orders: list
  });
});

// GET /orders/:id
router.get('/:id', (req, res) => {
  const order = db.orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  return res.json({ success: true, order });
});

// POST /orders (Create order from checkout)
router.post('/', (req, res) => {
  const {
    items = [],
    deliveryMode = 'EXPRESS_DELIVERY',
    deliveryAddress = 'Home Address',
    paymentMode = 'PHONEPE_UPI',
    couponCode = null,
    discount = 0,
    subtotal = 0,
    totalAmount = 0,
    customerName = 'Customer',
    customerPhone = '+919928123456'
  } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
  }

  // Assign nearest approved vendor
  const vendor = db.vendors.find(v => v.kycStatus === 'APPROVED') || db.vendors[0];
  const deliveryPartner = db.deliveryPartners.find(d => d.isOnline) || db.deliveryPartners[0];

  const newOrder = db.createOrder({
    customerId: 'cust-demo',
    customerName,
    customerPhone,
    vendorId: vendor ? vendor.id : 'vnd-01',
    vendorName: vendor ? vendor.shopName : 'Sharma Fresh Sabzi Bhandar',
    deliveryPartnerId: deliveryPartner ? deliveryPartner.id : 'dlv-01',
    deliveryPartnerName: deliveryPartner ? deliveryPartner.name : 'Vikram Choudhary',
    items,
    subtotal: Number(subtotal),
    discount: Number(discount),
    deliveryFee: deliveryMode === 'SHOP_PICKUP' ? 0 : db.settings.deliveryFeeBase,
    packagingFee: db.settings.packagingFee,
    totalAmount: Number(totalAmount),
    deliveryMode,
    deliveryAddress,
    paymentMode,
    paymentStatus: paymentMode === 'CASH_ON_DELIVERY' ? 'PENDING' : 'PAID',
    couponCode
  });

  return res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: newOrder
  });
});

// PATCH /orders/:id/status
router.patch('/:id/status', (req, res) => {
  const { status, note } = req.body;
  const updated = db.updateOrderStatus(req.params.id, status, {
    lastUpdated: new Date().toISOString(),
    statusNote: note
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  return res.json({
    success: true,
    message: `Order status updated to ${status}`,
    order: updated
  });
});

export default router;
