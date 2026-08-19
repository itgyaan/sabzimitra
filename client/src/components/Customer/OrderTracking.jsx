import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Bike, 
  Store, 
  Star, 
  ChevronRight,
  Package,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { LiveMapTilerTracker } from '../Common/LiveMapTilerTracker';

export const OrderTracking = () => {
  const { orders, activeOrderId, lang, updateOrderStatus, showToast } = useApp();
  const [rating, setRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewText, setReviewText] = useState('');

  // Find active order or latest order
  const order = orders.find(o => o.id === activeOrderId) || orders[0];

  if (!order) return null;

  const milestones = [
    { key: 'PLACED', titleEn: 'Order Confirmed', titleHi: 'ऑर्डर कन्फर्म हुआ', descEn: 'Mandi vendor assigned', descHi: 'मंडी वेंडर को भेजा गया' },
    { key: 'PACKED', titleEn: 'Sorted & Packed', titleHi: 'छंटाई व पैकिंग पूरी', descEn: 'Ozone cleaned & weighed', descHi: 'ओज़ोन वॉश व सही तौल' },
    { key: 'OUT_FOR_DELIVERY', titleEn: 'Out for Delivery', titleHi: 'रास्ते में है', descEn: 'Rider on electric EV', descHi: 'इलेक्ट्रिक बाइक पर रवाना' },
    { key: 'DELIVERED', titleEn: 'Delivered Fresh', titleHi: 'सफलतापूर्वक पहुंचा', descEn: 'At your doorstep', descHi: 'आपके द्वार पर' }
  ];

  const getStepIndex = (status) => {
    if (status === 'PLACED') return 0;
    if (status === 'ACCEPTED') return 0;
    if (status === 'PACKED') return 1;
    if (status === 'PICKED_UP' || status === 'OUT_FOR_DELIVERY') return 2;
    if (status === 'DELIVERED') return 3;
    return 0;
  };

  const currentStep = getStepIndex(order.status);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
    showToast('Review Submitted', 'Thank you for rating Mandi produce freshness!', 'success');
  };

  return (
    <div id="order-tracking-section" style={{
      margin: '30px 0',
      background: 'var(--bg-card)',
      borderRadius: '24px',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden'
    }}>
      {/* Header Bar */}
      <div style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-tag badge-green">LIVE TRACKING</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Order #{order.orderNumber}
            </h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {order.vendorName} • {order.items?.length || 0} items • ₹{order.totalAmount}
          </p>
        </div>

        {/* 4-Digit Delivery OTP Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--primary)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <KeyRound size={20} style={{ color: 'var(--primary)' }} />
          <div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              {lang === 'hi' ? 'डिलीवरी OTP' : 'Delivery OTP'}
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '3px' }}>
              {order.deliveryOtp}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '20px',
        padding: 'clamp(14px, 3vw, 24px)'
      }}>
        {/* Left: Real Interactive MapTiler Route Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <LiveMapTilerTracker
              status={order.status}
              vendorName={order.vendorName || 'Sharma Fresh Sabzi Bhandar'}
              customerName={order.customerName || 'Pooja Verma'}
              height="270px"
            />
          </div>

          {/* Delivery Partner Profile Card */}
          <div style={{
            background: 'var(--bg-card-subtle)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#3b82f6',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🛵
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {order.deliveryPartnerName || 'Vikram Choudhary'}
                </h4>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  EV Two-Wheeler • 4.9 ★ (1,240 Deliveries)
                </p>
              </div>
            </div>

            <a
              href="tel:+919887766554"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-sm)'
              }}
              title="Call Delivery Partner"
            >
              <Phone size={17} />
            </a>
          </div>
        </div>

        {/* Right: Milestone Timeline & Items Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Timeline steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {milestones.map((step, idx) => {
              const isPassed = currentStep >= idx;
              const isCurrent = currentStep === idx;

              return (
                <div key={step.key} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isPassed ? 'var(--primary)' : 'var(--bg-card-subtle)',
                    color: isPassed ? '#fff' : 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    zIndex: 2,
                    border: isCurrent ? '3px solid var(--primary-light)' : 'none',
                    boxShadow: isCurrent ? '0 0 12px rgba(16, 185, 129, 0.5)' : 'none'
                  }}>
                    {isPassed ? <CheckCircle2 size={16} /> : idx + 1}
                  </div>

                  {idx < milestones.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '13px',
                      top: '28px',
                      bottom: '-14px',
                      width: '2px',
                      background: currentStep > idx ? 'var(--primary)' : 'var(--border-color)',
                      zIndex: 1
                    }} />
                  )}

                  <div>
                    <h4 style={{
                      fontSize: '0.92rem',
                      fontWeight: isCurrent ? 800 : 600,
                      color: isPassed ? 'var(--text-main)' : 'var(--text-muted)'
                    }}>
                      {lang === 'hi' ? step.titleHi : step.titleEn}
                    </h4>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {lang === 'hi' ? step.descHi : step.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ordered Produce List */}
          <div style={{
            background: 'var(--bg-card-subtle)',
            padding: '14px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              {lang === 'hi' ? 'ऑर्डर की गई सब्जियां' : 'Produce in this order'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {order.items?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>{item.name || item.nameEn} ({item.portion || `${item.qty || 1} pack`})</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹{item.unitPrice ? item.unitPrice * (item.qty || 1) : item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Section upon Delivery */}
          {order.status === 'DELIVERED' && !reviewSubmitted && (
            <div style={{
              background: 'var(--primary-light)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                {lang === 'hi' ? 'सब्जियों की ताज़गी कैसी लगी?' : 'How fresh was your produce?'}
              </h4>
              <div style={{ display: 'flex', gap: '8px', margin: '8px 0 12px 0' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Star
                      size={24}
                      fill={star <= rating ? '#fbbf24' : 'transparent'}
                      color={star <= rating ? '#fbbf24' : 'var(--text-dim)'}
                    />
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmitReview} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Leave comment for farmer/vendor..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    background: '#fff'
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
