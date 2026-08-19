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
    setIsCartOpen, 
    orders, 
    setActiveOrderId,
    user,
    logout,
    setIsLoginModalOpen,
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
      <div className="container-max">
        {/* Top Row: Logo, Auth Profile, Language, Theme, Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          {/* Brand & Location */}
          <div 
            onClick={() => setRole('CUSTOMER')} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 4px 10px rgba(5, 150, 105, 0.35)',
              flexShrink: 0
            }}>
              🥬
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ 
                  fontWeight: 800, 
                  fontSize: '1.15rem', 
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap'
                }}>
                  {lang === 'hi' ? 'सब्ज़ी मित्र' : 'SabziMitra'}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  requestUserLocation(false);
                }}
                style={{
                  fontSize: '0.7rem',
                  color: userLocation?.isLiveGps ? '#10b981' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  margin: 0,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                title={lang === 'hi' ? 'सटीक जीपीएस लोकेशन की अनुमति दें' : 'Click to allow live GPS location'}
              >
                <MapPin size={11} style={{ color: userLocation?.isLiveGps ? '#10b981' : 'var(--primary)', flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap' }}>
                  {userLocation?.address ? userLocation.address.split(',')[0] : 'Jaipur'} • 15 Mins
                </span>
              </button>
            </div>
          </div>

          {/* Controls: Active Tracker, Auth Profile, Lang, Theme, Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
            {/* Active Order Tracker Chip */}
            {activeOrder && (
              <button
                onClick={() => {
                  setRole('CUSTOMER');
                  setActiveOrderId(activeOrder.id);
                  const trackElem = document.getElementById('order-tracking-section');
                  if (trackElem) trackElem.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  color: '#92400e',
                  border: '1px solid #fcd34d',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                className="pulse-animation"
              >
                <PackageCheck size={13} />
                <span>{lang === 'hi' ? 'ट्रैकिंग' : 'Track'}</span>
              </button>
            )}

            {/* Auth Profile / Login Avatar Button */}
            {user?.isAuthenticated ? (
              <button
                onClick={() => setRole('PROFILE')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: role === 'PROFILE' ? 'var(--primary-light)' : 'var(--bg-card)',
                  border: role === 'PROFILE' ? '2.5px solid var(--primary)' : '2px solid var(--primary)',
                  borderRadius: '50%',
                  padding: '2px',
                  cursor: 'pointer',
                  width: '36px',
                  height: '36px',
                  position: 'relative',
                  boxShadow: role === 'PROFILE' ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'var(--shadow-sm)',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
                title={lang === 'hi' ? `${user.name} (प्रोफ़ाइल व ऑर्डर्स)` : `${user.name} (Profile & Orders)`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                {/* Active Online Green Dot */}
                <span style={{
                  position: 'absolute',
                  bottom: '-1px',
                  right: '-1px',
                  width: '10px',
                  height: '10px',
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
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                title={t.login}
              >
                <User size={16} />
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '5px 9px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                minHeight: '34px'
              }}
              title="Switch Language"
            >
              <Globe size={13} style={{ color: 'var(--primary)' }} />
              <span>{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                width: '34px',
                height: '34px',
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
              {theme === 'dark' ? <Sun size={15} style={{ color: '#f59e0b' }} /> : <Moon size={15} />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary"
              style={{
                position: 'relative',
                padding: '6px 12px',
                fontSize: '0.8rem',
                minHeight: '34px'
              }}
            >
              <ShoppingBag size={15} />
              <span className="hide-on-mobile">{lang === 'hi' ? 'थैला' : 'Basket'}</span>
              {totalCartCount > 0 && (
                <span style={{
                  background: '#ffffff',
                  color: '#059669',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-full)',
                  padding: '1px 6px',
                  marginLeft: '2px'
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
              return (
                <button
                  key={item.key}
                  onClick={() => setRole(item.key)}
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
                >
                  <Icon size={13} style={{ color: isActive ? item.color : 'inherit', flexShrink: 0 }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
