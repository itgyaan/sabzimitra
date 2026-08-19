import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Leaf, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Clock
} from 'lucide-react';

export const SubscriptionBuilder = () => {
  const { isSubscriptionOpen, setIsSubscriptionOpen, addToCart, products, lang, showToast } = useApp();

  const [familySize, setFamilySize] = useState('4'); // '2', '4', '6'
  const [deliveryDay, setDeliveryDay] = useState('SUNDAY');
  const [organicPref, setOrganicPref] = useState(true);

  if (!isSubscriptionOpen) return null;

  const boxPlans = {
    '2': {
      title: 'Couple Healthy Mini Basket (3.5kg)',
      price: 199,
      mandiVal: 260,
      veggies: ['1kg Potato', '1kg Onion', '500g Tomato', '500g Palak', 'Free Coriander & Green Chillies']
    },
    '4': {
      title: 'Standard Family Kitchen Box (6.5kg)',
      price: 349,
      mandiVal: 480,
      veggies: ['2kg Agra Potato', '1.5kg Nashik Onion', '1kg Desi Tomato', '500g Bhindi', '500g Palak', '1pc Gobi', 'Free Lemon & Herbs']
    },
    '6': {
      title: 'Grand Joint Family Mega Box (11kg)',
      price: 549,
      mandiVal: 750,
      veggies: ['3kg Potato', '2.5kg Onion', '2kg Tomato', '1kg Bhindi', '1kg Gobi', '500g Capsicum', '500g Methi', '2pc Broccoli', 'Free Exotic Greens']
    }
  };

  const selectedPlan = boxPlans[familySize];

  const handleSubscribeAndAdd = () => {
    // Add combo item to cart
    const comboProduct = products.find(p => p.id === 'prod-combo-daily') || products[0];
    addToCart(comboProduct, `${selectedPlan.title}`, 1);
    setIsSubscriptionOpen(false);
    showToast('Subscription Box Added', `Your ${selectedPlan.title} is added to basket. Scheduled for every ${deliveryDay}.`);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      padding: '16px'
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '560px',
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
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} style={{ color: '#34d399' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {lang === 'hi' ? 'साप्ताहिक सब्जी सब्सक्रिप्शन बॉस्केट' : 'Weekly Sabzi Subscription Box'}
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)', marginTop: '2px' }}>
              Fresh weekly delivery with 25% direct mandi savings & zero delivery charges
            </p>
          </div>

          <button
            onClick={() => setIsSubscriptionOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Family Size Selector */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
              1. {lang === 'hi' ? 'परिवार के सदस्यों की संख्या' : 'Select Household Size'}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { key: '2', label: '1 - 2 People', badge: 'Mini (3.5kg)' },
                { key: '4', label: '3 - 4 People', badge: 'Standard (6.5kg)' },
                { key: '6', label: '5+ Joint Family', badge: 'Mega (11kg)' }
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFamilySize(f.key)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: familySize === f.key ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: familySize === f.key ? 'var(--primary-light)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: familySize === f.key ? 'var(--primary)' : 'var(--text-main)' }}>
                    {f.label}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {f.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Day */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
              2. {lang === 'hi' ? 'डिलीवरी का पसंदीदा दिन' : 'Preferred Delivery Schedule'}
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['SUNDAY', 'WEDNESDAY', 'FRIDAY'].map(day => (
                <button
                  key={day}
                  onClick={() => setDeliveryDay(day)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    border: deliveryDay === day ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                    background: deliveryDay === day ? 'var(--primary-light)' : 'transparent',
                    color: deliveryDay === day ? 'var(--primary)' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Every {day} Morning
                </button>
              ))}
            </div>
          </div>

          {/* Box Contents Breakdown */}
          <div style={{
            background: 'var(--bg-card-subtle)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {selectedPlan.title}
              </h4>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>
                  ₹{selectedPlan.price}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textDecoration: 'line-through', marginLeft: '6px' }}>
                  ₹{selectedPlan.mandiVal}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selectedPlan.veggies.map((v, i) => (
                <span key={i} className="badge-tag" style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
                  ✓ {v}
                </span>
              ))}
            </div>
          </div>

          {/* Subscribe Action */}
          <button
            onClick={handleSubscribeAndAdd}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '0.96rem',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <span>{lang === 'hi' ? `सब्सक्राइब करें व थैले में जोड़ें (₹${selectedPlan.price})` : `Subscribe Weekly Box (₹${selectedPlan.price})`}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
