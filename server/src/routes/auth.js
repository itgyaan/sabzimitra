import { Router } from 'express';

const router = Router();

// Mock OTP generation
router.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  // Demo standard OTP for frictionless pair programming and testing
  const demoOtp = '123456';
  return res.json({
    success: true,
    message: `OTP sent to ${phone}`,
    demoOtp,
    expiresInSeconds: 300
  });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { phone, otp, role = 'CUSTOMER', name } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
  }

  if (otp !== '123456' && otp.length !== 6) {
    return res.status(400).json({ success: false, message: 'Invalid OTP entered. (Use demo OTP: 123456)' });
  }

  const user = {
    id: `usr_${phone.replace(/\D/g, '').slice(-6) || 'demo'}`,
    phone,
    name: name || (role === 'CUSTOMER' ? 'Pooja Verma' : role === 'VENDOR' ? 'Ramesh Sharma' : role === 'DELIVERY_PARTNER' ? 'Vikram Choudhary' : 'Super Admin'),
    role,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
  };

  return res.json({
    success: true,
    token: `sm_jwt_mock_${Buffer.from(JSON.stringify(user)).toString('base64')}`,
    user
  });
});

export default router;
