import React, { useState } from 'react';
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
  ChevronDown
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
    isCartOpen,
    setIsCartOpen, 
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
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
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
              flex: '1 1 auto'
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
                  maxWidth: '120px',
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

          {/* Controls: Auth Profile, Lang, Theme, Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
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
                  boxShadow: role === 'PROFILE' ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'var(--shadow-sm)',
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
                  border: '2px solid var(--bg-card)',
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
                padding: '4px 7px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                height: '32px',
                flexShrink: 0
              }}
              title="Switch Language"
            >
              <Globe size={12} style={{ color: 'var(--primary)' }} />
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
              {theme === 'dark' ? <Sun size={14} style={{ color: '#f59e0b' }} /> : <Moon size={14} />}
            </button>

            {/* Cart Button (Always visible on all screen sizes) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary"
              style={{
                position: 'relative',
                padding: '6px 10px',
                fontSize: '0.78rem',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                boxShadow: totalCartCount > 0 ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
              }}
              title="Open Cart"
            >
              <ShoppingBag size={15} />
              <span className="hide-on-mobile">{lang === 'hi' ? 'थैला' : 'Cart'}</span>
              {totalCartCount > 0 && (
                <span style={{
                  background: '#ffffff',
                  color: '#059669',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  borderRadius: 'var(--radius-full)',
                  padding: '1px 6px',
                  marginLeft: '2px',
                  lineHeight: 1.2
                }}>
                  {totalCartCount}
                </span>
              )}
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

      {/* Floating Bottom Quick Cart Bar for Instant Mobile Access */}
      {role === 'CUSTOMER' && totalCartCount > 0 && !isCartOpen && (
        <div 
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 24px)',
            maxWidth: '460px',
            zIndex: 999,
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 10px 30px rgba(5, 150, 105, 0.5)',
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.22)',
              padding: '5px 10px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.82rem'
            }}>
              🛍️ {totalCartCount} {lang === 'hi' ? 'सामान' : 'Items'}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900 }}>
              ₹{cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.86rem' }}>
            <span>{lang === 'hi' ? 'थैला देखें' : 'View Cart'}</span>
            <span>➔</span>
          </div>
        </div>
      )}
    </header>
  );
};
