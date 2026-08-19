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
  ArrowRight
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
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState(false);

  const rider = deliveryPartners[0] || {
    name: 'Vikram Choudhary',
    vehicle: 'Hero Electric Nyx (RJ14-EV-9021)',
    rating: 4.9,
    tripsToday: 9,
    earningsToday: 740
  };

  // Orders available for delivery or actively on the way
  const activeTrips = orders.filter(o => ['PACKED', 'PICKED_UP', 'OUT_FOR_DELIVERY'].includes(o.status));
  const currentTrip = activeTrips[0];

  const handleVerifyDeliveryOtp = (e) => {
    e.preventDefault();
    if (!currentTrip) return;

    if (enteredOtp.trim() === currentTrip.deliveryOtp) {
      updateOrderStatus(currentTrip.id, 'DELIVERED');
      setEnteredOtp('');
      setOtpError(false);
      showToast(
        lang === 'hi' ? 'डिलीवरी सफल!' : 'Delivery Fulfilled!',
        `Trip payout credited to your wallet: +₹45`,
        'success'
      );
    } else {
      setOtpError(true);
      showToast('Incorrect OTP', `Please ask customer for correct 4-digit OTP. (Demo OTP: ${currentTrip.deliveryOtp})`, 'error');
    }
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
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
              {rider.vehicle} • 4.9 ★ Rating
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
            {rider.tripsToday} Orders
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

      {/* Active Trip Navigation & Doorstep OTP Verification */}
      {currentTrip ? (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px 24px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.03) 100%)',
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
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Trip #{currentTrip.orderNumber}
              </h3>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
              Payout: +₹45.00
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
            padding: 'clamp(14px, 3vw, 24px)'
          }}>
            {/* Route Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Pickup Point */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '14px',
                borderRadius: '14px',
                borderLeft: '4px solid #f59e0b'
              }}>
                <span style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 800, textTransform: 'uppercase' }}>
                  1. Mandi Pickup Point
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {currentTrip.vendorName || 'Sharma Fresh Sabzi Bhandar'}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Shop #14, APMC Muhana Mandi, Gate 2, Jaipur
                </p>
              </div>

              {/* Customer Drop Point */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '14px',
                borderRadius: '14px',
                borderLeft: '4px solid #10b981'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 800, textTransform: 'uppercase' }}>
                    2. Customer Doorstep Drop
                  </span>
                  <a
                    href="tel:+919928123456"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      fontWeight: 700
                    }}
                  >
                    <Phone size={13} />
                    <span>Call Customer</span>
                  </a>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                  {currentTrip.customerName || 'Pooja Verma'}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {currentTrip.deliveryAddress}
                </p>
              </div>

              {/* Items List */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <strong>Produce to Deliver:</strong> {currentTrip.items?.map(i => i.name || i.nameEn).join(', ')}
              </div>
            </div>

            {/* OTP Handover Verification Form */}
            <div style={{
              background: 'var(--primary-light)',
              padding: '24px',
              borderRadius: '18px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <KeyRound size={20} style={{ color: 'var(--primary)' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {lang === 'hi' ? 'कस्टमर डिलीवरी OTP डालें' : 'Verify Customer Delivery OTP'}
                </h4>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {lang === 'hi' 
                  ? 'ग्राहक को ताज़ी सब्जियां सौंपने के बाद उनका 4-अंकीय ओटीपी दर्ज करें।' 
                  : 'Ask customer for 4-digit code to confirm handoff and complete trip.'}
              </p>

              <form onSubmit={handleVerifyDeliveryOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter 4-Digit OTP (e.g. 5819)"
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: otpError ? '2px solid #ef4444' : '1.5px solid var(--primary)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    letterSpacing: '4px',
                    textAlign: 'center',
                    background: '#fff',
                    color: 'var(--text-main)'
                  }}
                />

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '12px',
                    fontSize: '0.92rem',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{lang === 'hi' ? 'सत्यापित करें व डिलीवरी पूरी करें' : 'Verify OTP & Complete Delivery'}</span>
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
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛵</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            {lang === 'hi' ? 'कोई नया डिलीवरी कार्य लंबित नहीं है' : 'All Clear! No Pending Deliveries'}
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            You are online. New orders from Mandi vendors will ring automatically.
          </p>
        </div>
      )}
    </div>
  );
};
