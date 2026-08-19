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
import { NotificationToast } from './components/NotificationToast';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Globe, 
  PhoneCall
} from 'lucide-react';

const MainContent = () => {
  const { role, lang, t, orders } = useApp();
  const hasActiveOrder = orders.some(o => o.status !== 'DELIVERED');

  return (
    <div className="app-wrapper">
      <Navbar />
      <RoleSwitcherBanner />

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
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
