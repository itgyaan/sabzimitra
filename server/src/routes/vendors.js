import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /vendors
router.get('/', (req, res) => {
  return res.json({
    success: true,
    vendors: db.vendors
  });
});

// POST /vendors/kyc
router.post('/kyc', (req, res) => {
  const { shopName, ownerName, phone, mandiLocation, mandiLicense, aadhaarNumber, bankAccount } = req.body;
  if (!shopName || !ownerName || !phone) {
    return res.status(400).json({ success: false, message: 'Missing required KYC fields' });
  }

  const vendor = db.registerKyc({
    shopName,
    ownerName,
    phone,
    mandiLocation: mandiLocation || 'APMC Main Mandi',
    mandiLicense: mandiLicense || `MND-${Math.floor(1000 + Math.random() * 9000)}`,
    aadhaarNumber: aadhaarNumber ? `XXXX-XXXX-${aadhaarNumber.slice(-4)}` : 'XXXX-XXXX-9988',
    bankAccount: bankAccount || 'SBIN0002931'
  });

  return res.status(201).json({
    success: true,
    message: 'KYC application submitted. Under review by Admin.',
    vendor
  });
});

// GET /vendors/:id/dashboard
router.get('/:id/dashboard', (req, res) => {
  const vendor = db.vendors.find(v => v.id === req.params.id) || db.vendors[0];
  const vendorOrders = db.orders.filter(o => o.vendorId === vendor.id);

  return res.json({
    success: true,
    vendor,
    orders: vendorOrders,
    products: db.products
  });
});

export default router;
