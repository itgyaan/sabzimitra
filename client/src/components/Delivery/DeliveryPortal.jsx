import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bike, 
  MapPin, 
  Navigation, 
  Phone, 
  CheckCircle2, 
  Coins, 
  KeyRound, 
  Clock, 
  Power, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  Package,
  Store,
  Home,
  Check,
  RotateCcw
} from 'lucide-react';

export const DeliveryPortal = () => {
  const { 
    orders, 
    updateOrderStatus, 
    deliveryPartners, 
    lang, 
    showToast 
  } = useApp();

  const [isOnline, setIsOnline] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState(false);

  const rider = deliveryPartners[0] || {
    name: 'Vikram Choudhary',
    vehicle: 'Hero Electric Nyx (RJ14-EV-9021)',
    rating: 4.9,
    tripsToday: 9,
    earningsToday: 740
  };

  // Filter orders by delivery statuses
  const pendingOrders = orders.filter(o => ['PLACED', 'PACKED', 'ACCEPTED'].includes(o.status));
  const ongoingOrders = orders.filter(o => ['PICKED_UP', 'OUT_FOR_DELIVERY'].includes(o.status));
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED');

  // Selected or active trip
  const activeOrder = orders.find(o => o.id === selectedOrderId) || ongoingOrders[0] || pendingOrders[0];

  const handleAcceptTrip = (orderId) => {
    updateOrderStatus(orderId, 'OUT_FOR_DELIVERY');
    setSelectedOrderId(orderId);
    showToast(
      lang === 'hi' ? 'ऑर्डर स्वीकार किया गया!' : 'Order Accepted!',
      'You accepted the delivery. Navigate to Mandi shop to pick up fresh produce.',
      'success'
    );
  };

  const handlePickupFromMandi = (orderId) => {
    updateOrderStatus(orderId, 'OUT_FOR_DELIVERY');
    showToast(
      lang === 'hi' ? 'मंडी से उठाया गया!' : 'Picked up from Mandi!',
      'Produce picked up. Head to customer doorstep.',
      'success'
    );
  };

  const handleVerifyDeliveryOtp = (e) => {
    e.preventDefault();
    if (!activeOrder) return;

    if (enteredOtp.trim() === activeOrder.deliveryOtp) {
      updateOrderStatus(activeOrder.id, 'DELIVERED');
      setEnteredOtp('');
      setOtpError(false);
      showToast(
        lang === 'hi' ? 'डिलीवरी सफल!' : 'Delivery Fulfilled!',
        'Trip payout credited to your wallet: +₹45.00',
        'success'
      );
    } else {
      setOtpError(true);
      showToast('Incorrect OTP', `Please enter the 4-digit code shared by customer. (Demo OTP: ${activeOrder.deliveryOtp})`, 'error');
    }
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }} className="animate-slide-up">
      {/* Rider Status & Shift Toggle Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)',
        color: '#ffffff',
        borderRadius: '24px',
        padding: '24px 30px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: '#3b82f6',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px'
          }}>
            🛵
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{rider.name}</h2>
              <span className={`badge-tag ${isOnline ? 'badge-green' : 'badge-gold'}`}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#93c5fd', marginTop: '2px' }}>
              {rider.vehicle} • 4.9 ★ Rating • Fleet Jaipur Node
            </p>
          </div>
        </div>

        {/* Online / Offline Toggle Button */}
        <button
          onClick={() => {
            setIsOnline(!isOnline);
            showToast('Rider Status', isOnline ? 'You went Offline' : 'You are now Online to receive deliveries!');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isOnline ? '#10b981' : '#475569',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }}
        >
          <Power size={16} />
          <span>{isOnline ? (lang === 'hi' ? 'ड्यूटी चालू है (Online)' : 'Duty Active (Online)') : 'Go Online'}</span>
        </button>
      </div>

      {/* Earnings Summary Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Today's Earnings</span>
            <Coins size={16} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)' }}>
            ₹{rider.earningsToday}
          </div>
          <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 600 }}>
            Includes ₹60 Customer Tips
          </span>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Trips Completed</span>
            <CheckCircle2 size={16} style={{ color: '#3b82f6' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)' }}>
            {deliveredOrders.length + 8} Orders
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Avg 14 mins per delivery
          </span>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Payout Schedule</span>
            <Clock size={16} style={{ color: '#f59e0b' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)' }}>
            Daily Mandi
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Direct UPI transfer at 9 PM
          </span>
        </div>
      </div>

      {/* Available & Active Orders Selector Pills */}
      {orders.filter(o => o.status !== 'DELIVERED').length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
            {lang === 'hi' ? '🛵 सक्रिय डिलीवरी कार्य चुनें:' : '🛵 Select Active Trip to Fulfill:'}
          </span>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="no-scrollbar">
            {orders.filter(o => o.status !== 'DELIVERED').map(o => (
              <button
                key={o.id}
                onClick={() => setSelectedOrderId(o.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: (activeOrder && activeOrder.id === o.id) ? '2px solid #3b82f6' : '1px solid var(--border-color)',
                  background: (activeOrder && activeOrder.id === o.id) ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-card)',
                  color: (activeOrder && activeOrder.id === o.id) ? '#3b82f6' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Order #{o.orderNumber}</span>
                <span className={`badge-tag ${o.status === 'OUT_FOR_DELIVERY' ? 'badge-green' : 'badge-gold'}`}>
                  {o.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Selected Trip Details */}
      {activeOrder && activeOrder.status !== 'DELIVERED' ? (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          {/* Active Trip Header */}
          <div style={{
            padding: '16px 24px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.04) 100%)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-tag" style={{ background: '#3b82f6', color: '#fff' }}>
                ACTIVE TASK
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Trip #{activeOrder.orderNumber}
              </h3>
              <span className="badge-tag badge-gold">
                {activeOrder.status}
              </span>
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--primary)' }}>
              Payout: +₹45.00
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
            padding: 'clamp(16px, 3vw, 24px)'
          }}>
            {/* Route & Stop Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Step 1: Mandi Pickup Point */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '16px',
                borderRadius: '16px',
                borderLeft: '5px solid #f59e0b',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Store size={13} />
                    <span>1. Mandi Pickup Point</span>
                  </span>
                  <a
                    href={`tel:${activeOrder.vendorPhone || '+919829011223'}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      color: '#b45309',
                      background: '#fef3c7',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      textDecoration: 'none',
                      fontWeight: 700
                    }}
                  >
                    <Phone size={12} />
                    <span>Call Shop</span>
                  </a>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '2px 0 0 0' }}>
                    {activeOrder.vendorName || 'Sharma Fresh Sabzi Bhandar'}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    📍 {activeOrder.vendorAddress || 'Shop #14, APMC Muhana Mandi, Gate 2, Jaipur'}
                  </p>
                </div>

                {/* Pickup action button if not out for delivery yet */}
                {['PLACED', 'PACKED', 'ACCEPTED'].includes(activeOrder.status) && (
                  <button
                    onClick={() => handlePickupFromMandi(activeOrder.id)}
                    className="btn-primary"
                    style={{
                      background: '#f59e0b',
                      color: '#fff',
                      padding: '8px 14px',
                      fontSize: '0.82rem',
                      alignSelf: 'flex-start',
                      marginTop: '4px'
                    }}
                  >
                    <Package size={14} />
                    <span>{lang === 'hi' ? 'मंडी से पार्सल उठा लिया' : 'Confirm Mandi Pickup'}</span>
                  </button>
                )}
              </div>

              {/* Step 2: Customer Drop Point */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '16px',
                borderRadius: '16px',
                borderLeft: '5px solid #10b981',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Home size={13} />
                    <span>2. Customer Doorstep Drop</span>
                  </span>
                  <a
                    href={`tel:${activeOrder.customerPhone || '+919928123456'}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      color: '#047857',
                      background: '#ecfdf5',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      textDecoration: 'none',
                      fontWeight: 700
                    }}
                  >
                    <Phone size={12} />
                    <span>Call Customer</span>
                  </a>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '2px 0 0 0' }}>
                    {activeOrder.customerName || 'Pooja Verma'}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    📍 {activeOrder.deliveryAddress || 'Flat 402, Green Valley Apartments, Malviya Nagar, Jaipur'}
                  </p>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    Phone: <strong>{activeOrder.customerPhone || '+91 9928123456'}</strong> • Payment: <strong>{activeOrder.paymentMode || 'PHONEPE_UPI'}</strong>
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}>
                <strong style={{ color: 'var(--text-main)' }}>Items to Deliver ({activeOrder.items?.length || 0}):</strong>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {activeOrder.items?.map((it, idx) => (
                    <span key={idx} className="badge-tag" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>
                      {it.name || it.nameEn} ({it.portion || `${it.qty || 1} pack`})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* OTP Handover Verification Form */}
            <div style={{
              background: 'var(--primary-light)',
              padding: '24px',
              borderRadius: '20px',
              border: '1.5px solid rgba(16, 185, 129, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <KeyRound size={22} style={{ color: 'var(--primary)' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {lang === 'hi' ? 'कस्टमर डिलीवरी OTP डालें' : 'Verify Customer Delivery OTP'}
                </h4>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                {lang === 'hi' 
                  ? 'ग्राहक को ताज़ी सब्जियां सौंपने के बाद उनका 4-अंकीय ओटीपी दर्ज करें।' 
                  : 'Ask customer for 4-digit code to confirm handoff and complete trip.'}
              </p>

              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '8px 14px',
                borderRadius: '10px',
                marginBottom: '14px',
                fontSize: '0.82rem',
                color: 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>ℹ️ Demo Customer OTP:</span>
                <span style={{ fontSize: '1.05rem', letterSpacing: '3px', fontWeight: 900, color: 'var(--primary)' }}>
                  {activeOrder.deliveryOtp}
                </span>
              </div>

              <form onSubmit={handleVerifyDeliveryOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="4-Digit OTP"
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: otpError ? '2px solid #ef4444' : '2px solid var(--primary)',
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    letterSpacing: '8px',
                    textAlign: 'center',
                    background: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    boxShadow: 'var(--shadow-sm)',
                    outline: 'none'
                  }}
                />

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '12px',
                    fontSize: '0.95rem',
                    borderRadius: '12px'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{lang === 'hi' ? 'ओटीपी सत्यापित करें व पूरा करें' : 'Verify OTP & Complete Delivery'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ fontSize: '44px', marginBottom: '12px' }}>🛵</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            {lang === 'hi' ? 'कोई नया डिलीवरी कार्य लंबित नहीं है' : 'All Clear! No Pending Deliveries'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isOnline 
              ? (lang === 'hi' ? 'आप ऑनलाइन हैं। मंडी वेंडर्स से नए ऑर्डर्स आते ही यहाँ दिखेंगे।' : 'You are online. New orders from Mandi vendors will appear automatically.') 
              : 'You are currently offline. Toggle duty above to receive delivery tasks.'}
          </p>
        </div>
      )}
    </div>
  );
};
