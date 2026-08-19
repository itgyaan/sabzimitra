import { Router } from 'express';

const router = Router();

// POST /payments/create-order (Razorpay & PhonePe simulation)
router.post('/create-order', (req, res) => {
  const { amount, gateway = 'PHONEPE', customerPhone } = req.body;

  const paymentId = gateway === 'RAZORPAY' 
    ? `pay_rzp_${Date.now()}`
    : `T260819${Math.floor(10000000 + Math.random() * 90000000)}`;

  return res.json({
    success: true,
    gateway,
    paymentId,
    amount,
    currency: 'INR',
    qrPayload: `upi://pay?pa=sabzimitra@yesbank&pn=SabziMitra&am=${amount}&tr=${paymentId}&cu=INR`,
    merchantName: 'SabziMitra Fresh Produce'
  });
});

// POST /payments/verify
router.post('/verify', (req, res) => {
  const { paymentId, gateway = 'PHONEPE' } = req.body;
  return res.json({
    success: true,
    status: 'PAID',
    gateway,
    transactionRef: `REF-${Date.now()}`,
    timestamp: new Date().toISOString()
  });
});

export default router;
