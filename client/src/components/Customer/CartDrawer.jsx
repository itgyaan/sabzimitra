import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  Zap, 
  Store, 
  ShieldCheck, 
  ArrowRight, 
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    clearCart,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    setIsCheckoutOpen,
    lang,
    t
  } = useApp();

  const [deliveryMode, setDeliveryMode] = useState('EXPRESS_DELIVERY'); // 'EXPRESS_DELIVERY' | 'SHOP_PICKUP'
  const [couponInput, setCouponInput] = useState('');
  const [address, setAddress] = useState('Flat 402, Green Valley Apartments, Malviya Nagar, Jaipur');

  if (!isCartOpen) return null;

  const itemSubtotal = cart.reduce((sum, item) => sum + (Number(item.unitPrice || item.price || item.pricePerKg) || 0) * (Number(item.qty) || 1), 0);
  const deliveryFee = deliveryMode === 'SHOP_PICKUP' || itemSubtotal >= 299 ? 0 : 15;
  const packagingFee = 5;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalAmount = Math.max(0, itemSubtotal + deliveryFee + packagingFee - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleProceed = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)'
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
        className="animate-slide-up mobile-full-modal"
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {t.cart}
            </h3>
            <span className="badge-tag badge-green">
              {cart.reduce((s, i) => s + i.qty, 0)} {lang === 'hi' ? 'सामान' : 'Items'}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
              opacity: 0.8
            }}>
              🥦
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              {t.emptyCart}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {lang === 'hi'
                ? 'दैनिक ताज़ा आलू, प्याज, टमाटर और हरी पत्तीदार सब्जियां जोड़ें।'
                : 'Add daily essentials and organic combos to get started.'}
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="btn-primary"
            >
              {lang === 'hi' ? 'सब्जियां देखें' : 'Explore Vegetables'}
            </button>
          </div>
        ) : (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
            {/* Delivery Mode Options */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              background: 'var(--bg-card-subtle)',
              padding: '6px',
              borderRadius: 'var(--radius-md)'
            }}>
              <button
                onClick={() => setDeliveryMode('EXPRESS_DELIVERY')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: deliveryMode === 'EXPRESS_DELIVERY' ? 'var(--bg-card)' : 'transparent',
                  color: deliveryMode === 'EXPRESS_DELIVERY' ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: deliveryMode === 'EXPRESS_DELIVERY' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Zap size={14} />
                <span>15-Min Express</span>
              </button>

              <button
                onClick={() => setDeliveryMode('SHOP_PICKUP')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: deliveryMode === 'SHOP_PICKUP' ? 'var(--bg-card)' : 'transparent',
                  color: deliveryMode === 'SHOP_PICKUP' ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: deliveryMode === 'SHOP_PICKUP' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Store size={14} />
                <span>Mandi Pickup (Free)</span>
              </button>
            </div>

            {/* Delivery Address Box */}
            <div style={{
              background: 'var(--bg-card-subtle)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <MapPin size={14} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {deliveryMode === 'EXPRESS_DELIVERY' ? 'Delivery Address' : 'Pickup Mandi Shop'}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                {deliveryMode === 'EXPRESS_DELIVERY' 
                  ? address 
                  : 'Sharma Fresh Sabzi Bhandar, Shop #14, APMC Mandi, Jaipur'}
              </p>
            </div>

            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map(item => (
                <div
                  key={item.itemKey}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.image}
                      alt={item.nameEn}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {lang === 'hi' ? item.nameHi : item.nameEn}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.portion} • ₹{item.unitPrice} each
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'var(--primary-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '3px 8px',
                      gap: '8px'
                    }}>
                      <button
                        onClick={() => updateCartQty(item.itemKey, -1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--primary)',
                          cursor: 'pointer',
                          display: 'flex'
                        }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.itemKey, 1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--primary)',
                          cursor: 'pointer',
                          display: 'flex'
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', minWidth: '45px', textAlign: 'right' }}>
                      ₹{item.unitPrice * item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons Module */}
            <div style={{
              background: 'var(--bg-card-subtle)',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-color)'
            }}>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                  <Tag size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter coupon (e.g. FRESH50)"
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 34px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.82rem',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                >
                  {t.applyCoupon}
                </button>
              </form>

              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--primary-light)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}>
                    ✓ {appliedCoupon.code} applied (Saved ₹{appliedCoupon.discount})
                  </span>
                  <button
                    onClick={() => removeCoupon()}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      color: '#ef4444',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      padding: '3px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['FRESH50', 'SABZIMITRA', 'KISAN10'].map(code => (
                    <button
                      key={code}
                      onClick={() => applyCouponCode(code)}
                      style={{
                        padding: '3px 8px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        cursor: 'pointer'
                      }}
                    >
                      +{code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div style={{
              background: 'var(--bg-card-subtle)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                {t.billDetails}
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>{t.itemTotal}</span>
                <span>₹{itemSubtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>{t.deliveryFee}</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#16a34a' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>{t.packagingFee}</span>
                <span>₹{packagingFee}</span>
              </div>
              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#16a34a', fontWeight: 700 }}>
                  <span>{t.couponDiscount} ({appliedCoupon.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.05rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '8px',
                marginTop: '4px'
              }}>
                <span>{t.toPay}</span>
                <span style={{ color: 'var(--primary)' }}>₹{totalAmount}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceed}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <span>{t.proceedToPay} (₹{totalAmount})</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
