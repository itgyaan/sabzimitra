import { Router } from 'express';
import { db } from '../data/db.js';

const router = Router();

// GET /analytics/overview
router.get('/overview', (req, res) => {
  const topProducts = db.products
    .slice(0, 5)
    .map((p, idx) => ({
      nameEn: p.nameEn,
      nameHi: p.nameHi,
      unitsSoldKg: 350 - idx * 45,
      revenue: (350 - idx * 45) * p.pricePerKg
    }));

  const salesTrend = [
    { day: 'Mon', gmv: 12400, orders: 42 },
    { day: 'Tue', gmv: 14200, orders: 48 },
    { day: 'Wed', gmv: 13800, orders: 45 },
    { day: 'Thu', gmv: 16900, orders: 58 },
    { day: 'Fri', gmv: 18400, orders: 64 },
    { day: 'Sat', gmv: 24500, orders: 86 },
    { day: 'Sun', gmv: 28900, orders: 98 }
  ];

  return res.json({
    success: true,
    topProducts,
    salesTrend,
    vendorRankings: db.vendors
  });
});

export default router;
