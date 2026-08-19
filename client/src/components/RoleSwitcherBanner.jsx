import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, UserCheck, Shield, ShoppingCart, Truck } from 'lucide-react';

export const RoleSwitcherBanner = () => {
  const { role, setRole, lang } = useApp();

  const roleDescriptions = {
    CUSTOMER: {
      title: lang === 'hi' ? '🛒 ग्राहक अनुभव मोड (Customer App)' : '🛒 Customer Shopping Mode',
      desc: lang === 'hi' 
        ? 'ताज़ा सब्जियां देखें, 250g/500g/1kg चुनें, कूपन लगाएं, और 15-मिनट डिलीवरी व लाइव जीपीएस ट्रैकिंग का आनंद लें।' 
        : 'Browse farm produce, select portions, apply coupons, simulate Razorpay/PhonePe checkout & live map tracking.'
    },
    VENDOR: {
      title: lang === 'hi' ? '🏪 मंडी दुकानदार / किसान मोड (Vendor Dashboard)' : '🏪 Mandi Vendor / Farmer Dashboard',
      desc: lang === 'hi' 
        ? 'दैनिक मंडी रेट अपडेट करें, नए ऑर्डर स्वीकार करें, सब्जियों की पैकिंग पूरी करें, और केवाईसी स्टेटस देखें।' 
        : 'Update daily mandi prices, accept live orders, pack vegetables, and manage vendor KYC onboarding.'
    },
    DELIVERY_PARTNER: {
      title: lang === 'hi' ? '🛵 डिलीवरी साथी मोड (Delivery Partner App)' : '🛵 Delivery Partner Portal',
      desc: lang === 'hi' 
        ? 'ऑनलाइन ड्यूटी ऑन करें, मंडी से ऑर्डर उठाएं, टर्न-बाय-टर्न नेविगेशन देखें और कस्टमर ओटीपी डालकर पूरा करें।' 
        : 'Toggle duty online, accept delivery requests, simulate live route navigation, and verify 4-digit customer OTP.'
    },
    ADMIN: {
      title: lang === 'hi' ? '🛡️ सुपर एडमिन कंट्रोल रूम (Admin Panel)' : '🛡️ Super Admin Command Center',
      desc: lang === 'hi' 
        ? 'प्लेटफॉर्म जीएमवी देखें, वेंडर केवाईसी अप्रूव करें, कमीशन % सेट करें, और प्रोमो बैनर / कूपन बनाएं।' 
        : 'Monitor GMV, review & approve vendor KYC documents, adjust platform commission %, and generate coupons.'
    }
  };

  const currentInfo = roleDescriptions[role];

  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
      borderBottom: '1px solid var(--border-color)',
      padding: '10px 0',
      fontSize: '0.86rem'
    }}>
      <div className="container-max" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: 'var(--primary)',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            fontWeight: 800
          }}>
            ACTIVE ROLE
          </span>
          <strong style={{ color: 'var(--text-main)' }}>{currentInfo.title}</strong>
          <span style={{ color: 'var(--text-muted)', display: 'none', md: 'inline' }}>
            — {currentInfo.desc}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {lang === 'hi' ? 'रोल बदलें:' : 'Quick Switch:'}
          </span>
          <button
            onClick={() => setRole('CUSTOMER')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: role === 'CUSTOMER' ? 'var(--primary)' : 'var(--bg-card)',
              color: role === 'CUSTOMER' ? '#fff' : 'var(--text-main)',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Customer
          </button>
          <button
            onClick={() => setRole('VENDOR')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: role === 'VENDOR' ? '#F59E0B' : 'var(--bg-card)',
              color: role === 'VENDOR' ? '#fff' : 'var(--text-main)',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Vendor
          </button>
          <button
            onClick={() => setRole('DELIVERY_PARTNER')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: role === 'DELIVERY_PARTNER' ? '#3B82F6' : 'var(--bg-card)',
              color: role === 'DELIVERY_PARTNER' ? '#fff' : 'var(--text-main)',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Delivery Rider
          </button>
          <button
            onClick={() => setRole('ADMIN')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: role === 'ADMIN' ? '#8B5CF6' : 'var(--bg-card)',
              color: role === 'ADMIN' ? '#fff' : 'var(--text-main)',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};
