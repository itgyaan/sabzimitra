import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { RoleSwitcherBanner } from './components/RoleSwitcherBanner';
import { CustomerHome } from './components/Customer/CustomerHome';
import { OrderTracking } from './components/Customer/OrderTracking';
import { CartDrawer } from './components/Customer/CartDrawer';
import { CheckoutModal } from './components/Customer/CheckoutModal';
import { SubscriptionBuilder } from './components/Customer/SubscriptionBuilder';
import { VendorDashboard } from './components/Vendor/VendorDashboard';
import { DeliveryPortal } from './components/Delivery/DeliveryPortal';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { ProfilePage } from './components/Profile/ProfilePage';
import { NotificationToast } from './components/NotificationToast';
import { LoginModal } from './components/Auth/LoginModal';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Globe, 
  PhoneCall
} from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error Caught:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: '#ffffff',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🥬</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>SabziMitra (सब्ज़ी मित्र)</h2>
          
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid #ef4444',
            borderRadius: '14px',
            padding: '16px',
            color: '#fca5a5',
            fontSize: '0.85rem',
            maxWidth: '650px',
            width: '100%',
            textAlign: 'left',
            fontFamily: 'monospace',
            marginBottom: '20px',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.4
          }}>
            <strong>Diagnostic Error:</strong>
            {'\n'}
            {this.state.error?.toString() || 'Unknown runtime error'}
            {'\n\n'}
            <small style={{ color: '#94a3b8' }}>{this.state.error?.stack || ''}</small>
          </div>

          <button
            onClick={() => {
              try {
                localStorage.clear();
                sessionStorage.clear();
              } catch(e) {}
              window.location.reload();
            }}
            style={{
              background: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)'
            }}
          >
            Clear Data & Refresh App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainContent = () => {
  const appState = useApp() || {};
  const { role = 'CUSTOMER', lang = 'hi', t = {}, orders = [] } = appState;
  const safeOrders = Array.isArray(orders) ? orders : [];
  const hasActiveOrder = safeOrders.some(o => o && o.status !== 'DELIVERED');

  return (
    <div className="app-wrapper">
      <Navbar />
      {role !== 'PROFILE' && <RoleSwitcherBanner />}

      <main className="container-max" style={{ flex: 1 }}>
        {role === 'CUSTOMER' && (
          <>
            {hasActiveOrder && <OrderTracking />}
            <CustomerHome />
            <CartDrawer />
            <CheckoutModal />
            <SubscriptionBuilder />
          </>
        )}

        {role === 'VENDOR' && <VendorDashboard />}

        {role === 'DELIVERY_PARTNER' && <DeliveryPortal />}

        {role === 'ADMIN' && <AdminDashboard />}

        {role === 'PROFILE' && <ProfilePage />}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '36px 0 24px 0',
        marginTop: 'auto'
      }}>
        <div className="container-max" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🥬</span>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'सब्ज़ी मित्र' : 'SabziMitra'}
              </span>
              <span className="badge-tag badge-green" style={{ fontSize: '0.68rem' }}>
                v1.0.0 PRD Ready
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {lang === 'hi'
                ? 'खेत और मंडी से सीधे आपकी रसोई तक। 15 मिनट सुपरफास्ट डिलीवरी।'
                : 'Hyperlocal Agri-Commerce ecosystem connecting Mandi vendors, riders & consumers.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>⚡ Node.js + React</span>
            <span>•</span>
            <span>📱 PWA Ready</span>
            <span>•</span>
            <span>🔒 Secure UPI</span>
          </div>
        </div>
      </footer>

      <NotificationToast />
      <LoginModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
