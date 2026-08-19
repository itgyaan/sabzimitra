import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /admin/stats
router.get('/stats', (req, res) => {
  const totalGmv = db.orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const platformRevenue = (totalGmv * db.settings.platformCommissionPct) / 100;
  const activeOrdersCount = db.orders.filter(o => o.status !== 'DELIVERED').length;
  const approvedVendorsCount = db.vendors.filter(v => v.kycStatus === 'APPROVED').length;
  const onlineRidersCount = db.deliveryPartners.filter(d => d.isOnline).length;

  return res.json({
    success: true,
    stats: {
      totalGmv: Math.round(totalGmv),
      platformRevenue: Math.round(platformRevenue),
      totalOrders: db.orders.length,
      activeOrders: activeOrdersCount,
      approvedVendors: approvedVendorsCount,
      totalVendors: db.vendors.length,
      onlineFleet: onlineRidersCount,
      commissionRatePct: db.settings.platformCommissionPct
    },
    settings: db.settings,
    banners: db.banners
  });
});

// POST /admin/vendors/:id/verify (Approve or Reject KYC)
router.post('/vendors/:id/verify', (req, res) => {
  const { status, rejectionReason } = req.body;
  if (!['APPROVED', 'REJECTED', 'UNDER_REVIEW'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  const updated = db.updateVendorKyc(req.params.id, { status, rejectionReason });
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Vendor not found' });
  }

  return res.json({
    success: true,
    message: `Vendor KYC status changed to ${status}`,
    vendor: updated
  });
});

// PUT /admin/settings
router.put('/settings', (req, res) => {
  const { platformCommissionPct, deliveryFeeBase, packagingFee } = req.body;
  if (platformCommissionPct !== undefined) {
    db.settings.platformCommissionPct = Number(platformCommissionPct);
  }
  if (deliveryFeeBase !== undefined) {
    db.settings.deliveryFeeBase = Number(deliveryFeeBase);
  }
  if (packagingFee !== undefined) {
    db.settings.packagingFee = Number(packagingFee);
  }

  return res.json({
    success: true,
    message: 'Platform settings updated successfully',
    settings: db.settings
  });
});

// POST /admin/banners
router.post('/banners', (req, res) => {
  const newBanner = {
    id: `ban-${Date.now()}`,
    active: true,
    ...req.body
  };
  db.banners.unshift(newBanner);
  return res.status(201).json({ success: true, banner: newBanner });
});

// POST /admin/coupons
router.post('/coupons', (req, res) => {
  const newCoupon = {
    ...req.body,
    code: req.body.code.toUpperCase()
  };
  db.coupons.unshift(newCoupon);
  return res.status(201).json({ success: true, coupon: newCoupon });
});

export default router;
