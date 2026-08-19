import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /coupons (List active public coupons)
router.get('/', (req, res) => {
  return res.json({
    success: true,
    coupons: db.coupons
  });
});

// POST /coupons/apply
router.post('/apply', (req, res) => {
  const { code, cartTotal = 0 } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code required' });
  }

  const result = db.applyCoupon(code, cartTotal);
  if (!result.valid) {
    return res.status(400).json({ success: false, message: result.message });
  }

  return res.json({
    success: true,
    discount: result.discount,
    code: result.code,
    message: result.message
  });
});

export default router;
