import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  MapPin, 
  Globe, 
  Moon, 
  Sun, 
  Store, 
  Bike, 
  ShieldCheck, 
  User, 
  UserCheck,
  PackageCheck,
  LogOut,
  ChevronDown,
  X,
  ArrowRight,
  Trash2
} from 'lucide-react';

export const Navbar = () => {
  const { 
    role, 
    setRole, 
    lang, 
    setLang, 
    theme, 
    setTheme, 
    cart, 
    updateCartQty,
    clearCart,
    isCartOpen,
    setIsCartOpen, 
    isCheckoutOpen,
    setIsCheckoutOpen,
    orders, 
    setActiveOrderId,
    user,
    userLocation,
    requestUserLocation,
    logout,
    logoutRole,
    setIsLoginModalOpen,
    switchRole,
    authenticatedRoles = {},
    t 
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const cartDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (Number(item.unitPrice || item.price || item.pricePerKg) || 0) * (Number(item.qty) || 1), 0);
  const activeOrder = orders.find(o => o.status !== 'DELIVERED');

  const roleNavItems = [
    { key: 'CUSTOMER', label: lang === 'hi' ? 'ग्राहक' : 'Customer', icon: User, color: '#10B981' },
    { key: 'VENDOR', label: lang === 'hi' ? 'दुकानदार' : 'Vendor', icon: Store, color: '#F59E0B' },
    { key: 'DELIVERY_PARTNER', label: lang === 'hi' ? 'डिलीवरी' : 'Rider', icon: Bike, color: '#3B82F6' },
    { key: 'ADMIN', label: lang === 'hi' ? 'एडमिन' : 'Admin', icon: ShieldCheck, color: '#8B5CF6' }
  ];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border-color)',
      padding: '10px 0'
    }}>
      <div className="container-max" style={{ padding: '0 12px' }}>
        {/* Top Row: Logo, Auth Profile, Language, Theme, Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px',
          width: '100%'
        }}>
          {/* Brand & Location */}
          <div 
            onClick={() => setRole('CUSTOMER')} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              minWidth: 0,
              flexShrink: 1
            }}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              boxShadow: '0 4px 10px rgba(5, 150, 105, 0.35)',
              flexShrink: 0
            }}>
              🥬
            </div>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ 
                fontWeight: 800, 
                fontSize: '1.05rem', 
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                lineHeight: 1.1
              }}>
                {lang === 'hi' ? 'सब्ज़ी मित्र' : 'SabziMitra'}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  requestUserLocation(false);
                }}
                style={{
                  fontSize: '0.68rem',
                  color: userLocation?.isLiveGps ? '#10b981' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  margin: '1px 0 0 0',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontWeight: 600,
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                title={lang === 'hi' ? 'सटीक जीपीएस लोकेशन' : 'Live GPS location'}
              >
                <MapPin size={10} style={{ color: userLocation?.isLiveGps ? '#10b981' : 'var(--primary)', flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {userLocation?.address ? userLocation.address.split(',')[0] : 'Jaipur'}
                </span>
              </button>
            </div>
          </div>

          {/* Controls: Cart, Auth Profile, Lang, Theme */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            {/* Cart Button & Dropdown Container */}
            <div style={{ position: 'relative' }} ref={cartDropdownRef}>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth <= 640) {
                    setIsCartOpen(true);
                  } else {
                    setIsCartDropdownOpen(prev => !prev);
                  }
                }}
                className="btn-primary"
                style={{
                  position: 'relative',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  flexShrink: 0,
                  borderRadius: 'var(--radius-full)',
                  boxShadow: totalCartCount > 0 ? '0 0 12px rgba(16, 185, 129, 0.45)' : 'none',
                  cursor: 'pointer'
                }}
                title={lang === 'hi' ? 'थैला देखें' : 'View Basket'}
              >
                <ShoppingBag size={15} />
                <span className="hide-on-mobile">{lang === 'hi' ? 'थैला' : 'Cart'}</span>
                {totalCartCount > 0 && (
                  <span style={{
                    background: '#ffffff',
                    color: '#059669',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    borderRadius: 'var(--radius-full)',
                    padding: '1px 5px',
                    lineHeight: 1.1
                  }}>
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Responsive Dropdown Menu Below the Cart Button */}
              {isCartDropdownOpen && (
                <>
                  <div 
                    className="cart-dropdown-popover"
                  >
                    {/* Dropdown Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '10px',
                      borderBottom: '1px solid var(--border-color)'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '18px' }}>🛍️</span>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                        {lang === 'hi' ? 'आपका थैला' : 'Your Basket'} ({totalCartCount})
                      </span>
                    </div>
                    <button 
                      onClick={() => setIsCartDropdownOpen(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Items List */}
                  {cart.length === 0 ? (
                    <div style={{ padding: '24px 10px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛒</div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        {lang === 'hi' ? 'आपका थैला अभी खाली है' : 'Your basket is empty'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div 
                        style={{ 
                          maxHeight: '220px', 
                          overflowY: 'auto', 
                          padding: '6px 0',
                          margin: '4px 0'
                        }} 
                        className="custom-scrollbar"
                      >
                        {cart.map((item) => {
                          const itemPrice = Number(item.unitPrice || item.price || item.pricePerKg) || 0;
                          const itemQty = Number(item.qty) || 1;
                          const itemTotal = itemPrice * itemQty;
                          return (
                            <div 
                              key={item.itemKey} 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                padding: '8px 0',
                                borderBottom: '1px solid var(--border-color)',
                                gap: '8px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                                <span style={{ fontSize: '20px' }}>{item.icon || '🥬'}</span>
                                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                                  <div style={{ 
                                    fontSize: '0.82rem', 
                                    fontWeight: 700, 
                                    color: 'var(--text-main)', 
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis' 
                                  }}>
                                    {lang === 'hi' ? item.nameHi : item.nameEn}
                                  </div>
                                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                    {item.portion} • ₹{itemPrice} × {itemQty}
                                  </div>
                                </div>
                              </div>

                              {/* Qty Counter & Price */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                <div style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '4px',
                                  background: 'var(--bg-card-subtle)',
                                  borderRadius: 'var(--radius-full)',
                                  padding: '2px 6px',
                                  border: '1px solid var(--border-color)'
                                }}>
                                  <button 
                                    onClick={() => updateCartQty(item.itemKey, -1)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-main)' }}
                                  >
                                    -
                                  </button>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 800, minWidth: '14px', textAlign: 'center' }}>
                                    {itemQty}
                                  </span>
                                  <button 
                                    onClick={() => updateCartQty(item.itemKey, 1)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', fontWeight: 800, fontSize: '0.8rem', color: 'var(--primary)' }}
                                  >
                                    +
                                  </button>
                                </div>
                                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)', minWidth: '42px', textAlign: 'right' }}>
                                  ₹{itemTotal}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Total & Action Buttons */}
                      <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            {lang === 'hi' ? 'कुल राशि (Subtotal):' : 'Cart Subtotal:'}
                          </span>
                          <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--primary)' }}>
                            ₹{cartSubtotal}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              setIsCartDropdownOpen(false);
                              setIsCartOpen(true);
                            }}
                            style={{
                              flex: 1,
                              background: 'var(--bg-card-subtle)',
                              color: 'var(--text-main)',
                              border: '1px solid var(--border-color)',
                              padding: '8px 10px',
                              borderRadius: '12px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {lang === 'hi' ? 'पूरा थैला' : 'Full Cart'}
                          </button>

                          <button
                            onClick={() => {
                              setIsCartDropdownOpen(false);
                              setIsCheckoutOpen(true);
                            }}
                            className="btn-primary"
                            style={{
                              flex: 1.3,
                              padding: '8px 10px',
                              borderRadius: '12px',
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <span>{lang === 'hi' ? 'ऑर्डर करें' : 'Checkout'}</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

            {/* Auth Profile / Login Avatar Button */}
            {user?.isAuthenticated ? (
              <button
                onClick={() => setRole('PROFILE')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: role === 'PROFILE' ? 'var(--primary-light)' : 'var(--bg-card)',
                  border: role === 'PROFILE' ? '2px solid var(--primary)' : '1.5px solid var(--primary)',
                  borderRadius: '50%',
                  padding: '1px',
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  position: 'relative',
                  boxShadow: role === 'PROFILE' ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'var(--shadow-sm)',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
                title={lang === 'hi' ? `${user.name} (प्रोफ़ाइल)` : `${user.name} (Profile)`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                {/* Active Online Green Dot */}
                <span style={{
                  position: 'absolute',
                  bottom: '-1px',
                  right: '-1px',
                  width: '8px',
                  height: '8px',
                  background: '#10b981',
                  border: '1.5px solid var(--bg-card)',
                  borderRadius: '50%'
                }} />
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card)',
                  color: 'var(--primary)',
                  border: '1.5px solid var(--primary)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                title={t.login}
              >
                <User size={15} />
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '4px 6px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                height: '32px',
                flexShrink: 0
              }}
              title="Switch Language"
            >
              <Globe size={11} style={{ color: 'var(--primary)' }} />
              <span>{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)',
                cursor: 'pointer',
                flexShrink: 0
              }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={13} style={{ color: '#f59e0b' }} /> : <Moon size={13} />}
            </button>
          </div>
        </div>

        {/* Second Row: Role Switcher Tabs (Horizontally scrollable with smooth touch) */}
        <div style={{
          marginTop: '10px',
          display: 'flex',
          overflowX: 'auto',
          paddingBottom: '2px'
        }} className="no-scrollbar">
          <nav style={{
            display: 'inline-flex',
            background: 'var(--bg-card-subtle)',
            padding: '3px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            gap: '3px',
            width: '100%'
          }}>
            {roleNavItems.map(item => {
              const Icon = item.icon;
              const isActive = role === item.key;
              const isAuthed = authenticatedRoles[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => switchRole(item.key)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: isActive ? 'var(--bg-card)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap'
                  }}
                  title={isAuthed ? `${item.label} (Authenticated)` : `${item.label} (Click to Login)`}
                >
                  <Icon size={13} style={{ color: isActive ? item.color : 'inherit', flexShrink: 0 }} />
                  <span>{item.label}</span>
                  {!isAuthed && item.key !== 'CUSTOMER' && (
                    <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>🔒</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
