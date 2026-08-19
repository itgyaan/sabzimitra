import React from 'react';
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
  PackageCheck,
  Sparkles
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
    t 
  } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const activeOrder = orders.find(o => o.status !== 'DELIVERED');

  const roleNavItems = [
    { key: 'CUSTOMER', label: lang === 'hi' ? 'ग्राहक ऐप' : 'Customer App', icon: User, color: '#10B981' },
    { key: 'VENDOR', label: lang === 'hi' ? 'दुकानदार पोर्टल' : 'Vendor Portal', icon: Store, color: '#F59E0B' },
    { key: 'DELIVERY_PARTNER', label: lang === 'hi' ? 'डिलीवरी साथी' : 'Delivery Rider', icon: Bike, color: '#3B82F6' },
    { key: 'ADMIN', label: lang === 'hi' ? 'एडमिन पैनल' : 'Admin Hub', icon: ShieldCheck, color: '#8B5CF6' }
  ];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 0'
    }}>
      <div className="container-max" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Brand & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div 
            onClick={() => setRole('CUSTOMER')} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer' 
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.35)'
            }}>
              🥬
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ 
                  fontWeight: 800, 
                  fontSize: '1.35rem', 
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em'
                }}>
                  {lang === 'hi' ? 'सब्ज़ी मित्र' : 'SabziMitra'}
                </span>
                <span className="badge-tag badge-green" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                  PRODUCE
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} style={{ color: 'var(--primary)' }} />
                <span>Jaipur Mandi Hub • 15 Mins</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Role Switcher Tabs */}
        <nav style={{
          display: 'flex',
          background: 'var(--bg-card-subtle)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)',
          gap: '4px',
          overflowX: 'auto'
        }}>
          {roleNavItems.map(item => {
            const Icon = item.icon;
            const isActive = role === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setRole(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={15} style={{ color: isActive ? item.color : 'inherit' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls: Track Order, Language, Theme, Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                gap: '6px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                color: '#92400e',
                border: '1px solid #fcd34d',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              className="pulse-animation"
            >
              <PackageCheck size={14} />
              <span>{lang === 'hi' ? 'ऑर्डर रास्ते में है' : 'Live Tracking'}</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '7px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Switch Language"
          >
            <Globe size={15} style={{ color: 'var(--primary)' }} />
            <span>{lang === 'hi' ? 'English' : 'हिन्दी'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={17} style={{ color: '#f59e0b' }} /> : <Moon size={17} />}
          </button>

          {/* Cart Button (Customer Mode) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-primary"
            style={{
              position: 'relative',
              padding: '8px 16px',
              fontSize: '0.85rem'
            }}
          >
            <ShoppingBag size={18} />
            <span style={{ display: 'inline-block' }}>{lang === 'hi' ? 'थैला' : 'Basket'}</span>
            {totalCartCount > 0 && (
              <span style={{
                background: '#ffffff',
                color: '#059669',
                fontSize: '0.72rem',
                fontWeight: 800,
                borderRadius: 'var(--radius-full)',
                padding: '2px 7px',
                marginLeft: '4px'
              }}>
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
