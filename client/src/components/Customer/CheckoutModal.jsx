import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  Banknote, 
  QrCode, 
  CheckCircle2, 
  Lock,
  ArrowRight,
  Clock
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    appliedCoupon, 
    createOrder,
    lang,
    t 
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('PHONEPE'); // 'PHONEPE' | 'RAZORPAY' | 'COD'
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const itemSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const deliveryFee = itemSubtotal >= 299 ? 0 : 15;
  const packagingFee = 5;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalAmount = Math.max(0, itemSubtotal + deliveryFee + packagingFee - discountAmount);

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // fallback
      }

      setTimeout(() => {
        createOrder({
          items: cart,
          subtotal: itemSubtotal,
          discount: discountAmount,
          deliveryFee,
          packagingFee,
          totalAmount,
          paymentMode: paymentMethod === 'PHONEPE' ? 'PHONEPE_UPI' : paymentMethod === 'RAZORPAY' ? 'RAZORPAY_CARD' : 'CASH_ON_DELIVERY',
          couponCode: appliedCoupon ? appliedCoupon.code : null,
          deliveryAddress: 'Flat 402, Green Valley Apartments, Malviya Nagar, Jaipur'
        });
      }, 1400);
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(6px)',
      padding: '16px'
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="animate-slide-up"
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {lang === 'hi' ? 'सुरक्षित चेकआउट' : 'Secure Payment'}
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={12} style={{ color: 'var(--primary)' }} />
              <span>256-Bit Encrypted Mandi Payment Gateway</span>
            </p>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            disabled={isProcessing}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {paymentSuccess ? (
          <div style={{
            padding: '50px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {lang === 'hi' ? 'भुगतान सफल रहा!' : 'Payment Confirmed!'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {lang === 'hi'
                ? 'आपका ताज़ा सब्जी ऑर्डर मंडी वेंडर को भेज दिया गया है। 15-मिनट डिलीवरी शुरू हो रही है!'
                : 'Order dispatched to nearest Mandi Vendor. Starting hyper-local 15-min delivery.'}
            </p>
            <span className="badge-tag badge-green" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
              Redirecting to Live GPS Tracking...
            </span>
          </div>
        ) : (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Amount Banner */}
            <div style={{
              background: 'var(--bg-card-subtle)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Amount Payable</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ₹{totalAmount}
                </div>
              </div>
              <span className="badge-tag badge-gold">
                {cart.length} Products
              </span>
            </div>

            {/* Payment Method Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Select Payment Mode
              </span>

              {/* PhonePe UPI */}
              <div
                onClick={() => setPaymentMethod('PHONEPE')}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: paymentMethod === 'PHONEPE' ? '2px solid #6739B7' : '1px solid var(--border-color)',
                  background: paymentMethod === 'PHONEPE' ? 'rgba(103, 57, 183, 0.05)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#6739B7',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem'
                  }}>
                    पे
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      PhonePe / Google Pay UPI
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Instant 0-fee UPI QR Code & Direct Intent
                    </p>
                  </div>
                </div>
                <span className="badge-tag" style={{ background: '#ede9fe', color: '#6739B7', fontWeight: 700 }}>
                  POPULAR
                </span>
              </div>

              {/* Razorpay Cards */}
              <div
                onClick={() => setPaymentMethod('RAZORPAY')}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: paymentMethod === 'RAZORPAY' ? '2px solid #0c83ff' : '1px solid var(--border-color)',
                  background: paymentMethod === 'RAZORPAY' ? 'rgba(12, 131, 255, 0.05)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#0c83ff',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Razorpay Gateway
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Credit/Debit Cards, Netbanking, Wallets
                    </p>
                  </div>
                </div>
              </div>

              {/* Cash On Delivery */}
              <div
                onClick={() => setPaymentMethod('COD')}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: paymentMethod === 'COD' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: paymentMethod === 'COD' ? 'var(--primary-light)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#059669',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Banknote size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Cash on Delivery (COD)
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Pay cash or UPI after inspecting vegetable freshness
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated UPI QR Code Preview if PhonePe selected */}
            {paymentMethod === 'PHONEPE' && (
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                border: '1px dashed #6739B7'
              }}>
                <div style={{
                  background: '#fff',
                  padding: '8px',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <QrCode size={44} color="#6739B7" />
                </div>
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Scan & Pay with Any UPI App
                  </h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    GPay, PhonePe, Paytm, BHIM to <strong>sabzimitra@yesbank</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Action Pay Button */}
            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                borderRadius: 'var(--radius-md)',
                background: paymentMethod === 'PHONEPE' ? 'linear-gradient(135deg, #6739B7 0%, #512DA8 100%)' : undefined
              }}
            >
              {isProcessing ? (
                <span>Verifying with Mandi Gateway...</span>
              ) : (
                <>
                  <span>
                    {paymentMethod === 'COD' ? 'Confirm Cash Order' : `Pay ₹${totalAmount} Now`}
                  </span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
