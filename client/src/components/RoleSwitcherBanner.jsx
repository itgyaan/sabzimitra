import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, UserCheck, Shield, ShoppingCart, Truck } from 'lucide-react';

export const RoleSwitcherBanner = () => {
  const { role, setRole, lang, logoutRole } = useApp();

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
    },
    PROFILE: {
      title: lang === 'hi' ? '👤 मेरी प्रोफ़ाइल व ऑर्डर्स (My Account)' : '👤 My Account & Orders',
      desc: lang === 'hi'
        ? 'अपनी प्रोफ़ाइल, नाम, डिलीवरी पता, लाइव ऑर्डर्स व ऑर्डर इतिहास प्रबंधित करें।'
        : 'Manage your profile details, delivery address, live orders, and past history.'
    }
  };

  const currentInfo = roleDescriptions[role] || roleDescriptions.CUSTOMER;

  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
      borderBottom: '1px solid var(--border-color)',
      padding: '7px 0',
      fontSize: '0.8rem'
    }}>
      <div className="container-max" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            background: 'var(--primary)',
            color: '#fff',
            padding: '2px 7px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.66rem',
            fontWeight: 800
          }}>
            ACTIVE MODE
          </span>
          <strong style={{ color: 'var(--text-main)', fontSize: '0.84rem' }}>{currentInfo.title}</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <p style={{
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '450px'
          }} className="hide-on-mobile">
            {currentInfo.desc}
          </p>

          {role !== 'CUSTOMER' && role !== 'PROFILE' && (
            <button
              onClick={() => logoutRole(role)}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#ef4444',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Lock and sign out of this role"
            >
              🔒 {lang === 'hi' ? 'लॉगआउट' : 'Lock & Exit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
