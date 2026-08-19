import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Store, 
  Bike, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Tag, 
  Activity, 
  AlertTriangle, 
  DollarSign,
  Sparkles,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Trash2,
  Lock,
  Unlock,
  Package,
  Calendar,
  ExternalLink,
  Percent,
  Check
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    customers = [],
    addCustomer,
    updateCustomerStatus,
    deleteCustomer,
    vendors = [],
    addVendor,
    updateVendorKyc,
    toggleVendorOpen,
    deleteVendor,
    deliveryPartners = [],
    addDeliveryPartner,
    toggleRiderDuty,
    deleteRider,
    orders = [],
    products = [],
    coupons = [],
    addCoupon,
    deleteCoupon,
    commissionRate = 8.5,
    setCommissionRate,
    lang = 'hi',
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('OVERVIEW'); // OVERVIEW, CUSTOMERS, VENDORS, RIDERS, ORDERS, SETTINGS
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isAddRiderOpen, setIsAddRiderOpen] = useState(false);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);

  // Forms state
  const [custForm, setCustForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [vendorForm, setVendorForm] = useState({ shopName: '', ownerName: '', phone: '', mandiLocation: '', mandiLicense: '', aadhaarNumber: '' });
  const [riderForm, setRiderForm] = useState({ name: '', phone: '', vehicle: '' });
  const [couponForm, setCouponForm] = useState({ code: '', discountPercent: 20, minOrder: 199, desc: '' });

  // Calculations
  const totalGmv = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 48500;
  const platformRevenue = Math.round((totalGmv * commissionRate) / 100);
  const pendingVendors = vendors.filter(v => v.kycStatus === 'PENDING');
  const activeRiders = deliveryPartners.filter(r => r.isOnline);

  // Filtered lists
  const filteredCustomers = customers.filter(c => 
    !searchQuery || 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone?.includes(searchQuery) ||
    c.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVendors = vendors.filter(v => 
    !searchQuery || 
    v.shopName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.ownerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.mandiLocation?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRiders = deliveryPartners.filter(r => 
    !searchQuery || 
    r.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.phone?.includes(searchQuery) ||
    r.vehicle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustSubmit = (e) => {
    e.preventDefault();
    if (!custForm.name || !custForm.phone) return;
    addCustomer(custForm);
    setCustForm({ name: '', phone: '', email: '', address: '' });
    setIsAddCustomerOpen(false);
  };

  const handleVendorSubmit = (e) => {
    e.preventDefault();
    if (!vendorForm.shopName || !vendorForm.ownerName || !vendorForm.phone) return;
    addVendor(vendorForm);
    setVendorForm({ shopName: '', ownerName: '', phone: '', mandiLocation: '', mandiLicense: '', aadhaarNumber: '' });
    setIsAddVendorOpen(false);
  };

  const handleRiderSubmit = (e) => {
    e.preventDefault();
    if (!riderForm.name || !riderForm.phone) return;
    addDeliveryPartner(riderForm);
    setRiderForm({ name: '', phone: '', vehicle: '' });
    setIsAddRiderOpen(false);
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponForm.code) return;
    addCoupon({
      code: couponForm.code.toUpperCase(),
      discountPercent: Number(couponForm.discountPercent),
      minOrder: Number(couponForm.minOrder),
      desc: couponForm.desc || `${couponForm.discountPercent}% Flat Off on fresh Mandi orders`
    });
    setCouponForm({ code: '', discountPercent: 20, minOrder: 199, desc: '' });
    setIsAddCouponOpen(false);
  };

  return (
    <div style={{ padding: '20px 0 60px 0' }}>
      {/* Admin Command Header */}
      <div style={{
        background: 'linear-gradient(135deg, #311042 0%, #0f172a 100%)',
        color: '#ffffff',
        borderRadius: '24px',
        padding: '24px 28px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            boxShadow: '0 8px 20px rgba(139, 92, 246, 0.4)'
          }}>
            🛡️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                {lang === 'hi' ? 'सुपर एडमिन कमांड सेंटर' : 'Super Admin Command Center'}
              </h2>
              <span className="badge-tag" style={{ background: '#10b981', color: '#fff' }}>
                99.9% LIVE UPTIME
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#c4b5fd', marginTop: '2px' }}>
              Manage All Customers, Mandi Vendors, Delivery Fleet & Platform Orders
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.78rem',
          backdropFilter: 'blur(8px)'
        }}>
          <Activity size={14} style={{ color: '#34d399' }} />
          <span>Jaipur APMC Node #1 Active</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Total GMV</span>
            <TrendingUp size={16} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-main)' }}>
            ₹{totalGmv.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>+24.5% this week</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Customers</span>
            <Users size={16} style={{ color: '#3b82f6' }} />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-main)' }}>
            {customers.length}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Registered</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Vendors</span>
            <Store size={16} style={{ color: '#f59e0b' }} />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-main)' }}>
            {vendors.length}
          </div>
          <span style={{ fontSize: '0.7rem', color: pendingVendors.length > 0 ? '#ef4444' : '#16a34a', fontWeight: 700 }}>
            {pendingVendors.length} Pending KYC
          </span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Riders Online</span>
            <Bike size={16} style={{ color: '#10b981' }} />
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#10b981' }}>
            {activeRiders.length} / {deliveryPartners.length}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Active on Road</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '20px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        {[
          { id: 'OVERVIEW', label: lang === 'hi' ? '📊 अवलोकन (Overview)' : '📊 Overview' },
          { id: 'CUSTOMERS', label: `👥 ग्राहक (Customers ${customers.length})` },
          { id: 'VENDORS', label: `🏪 दुकानदार (Vendors ${vendors.length})` },
          { id: 'RIDERS', label: `🛵 राइडर्स (Fleet ${deliveryPartners.length})` },
          { id: 'ORDERS', label: `📦 ऑर्डर्स (Orders ${orders.length})` },
          { id: 'SETTINGS', label: lang === 'hi' ? '⚙️ सेटिंग्स व कूपन' : '⚙️ Settings & Coupons' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSearchQuery('');
            }}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              background: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === tab.id ? '#ffffff' : 'var(--text-main)',
              border: activeTab === tab.id ? 'none' : '1px solid var(--border-color)',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* KYC Pending Section */}
          {pendingVendors.length > 0 && (
            <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ⚠️ Pending Vendor KYC Verifications ({pendingVendors.length})
                </h3>
                <button onClick={() => setActiveTab('VENDORS')} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                  View All
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '12px' }}>
                {pendingVendors.map(v => (
                  <div key={v.id} style={{ background: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{v.shopName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Owner: {v.ownerName} • 📞 {v.phone}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '4px 0 10px 0' }}>License: {v.mandiLicense}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => updateVendorKyc(v.id, 'APPROVED')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                        <CheckCircle2 size={13} />
                        <span>Approve</span>
                      </button>
                      <button onClick={() => updateVendorKyc(v.id, 'REJECTED')} style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '1px solid #ef4444', color: '#ef4444', background: 'transparent', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                        <XCircle size={13} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-main)' }}>
                📈 Ecosystem Revenue Model
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Mandi Direct GMV</span>
                  <strong>₹{totalGmv.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Platform Take Rate</span>
                  <strong style={{ color: '#8b5cf6' }}>{commissionRate}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Net Platform Profit</span>
                  <strong style={{ color: '#10b981', fontSize: '1.1rem' }}>₹{platformRevenue.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-main)' }}>
                🛵 Fleet Live Readiness
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {deliveryPartners.map(r => (
                  <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-card-subtle)', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.isOnline ? '#10b981' : '#94a3b8' }}></span>
                      <span style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-main)' }}>{r.name}</span>
                    </div>
                    <span className={r.isOnline ? 'badge-tag badge-green' : 'badge-tag'} style={{ fontSize: '0.68rem' }}>
                      {r.isOnline ? 'ON DUTY' : 'OFFLINE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMER MANAGEMENT */}
      {activeTab === 'CUSTOMERS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search customer name, phone, address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.84rem'
                }}
              />
            </div>
            <button
              onClick={() => setIsAddCustomerOpen(true)}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <Plus size={15} />
              <span>Add Customer</span>
            </button>
          </div>

          {/* Customers Table / Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredCustomers.map(cust => (
              <div
                key={cust.id}
                className="glass-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '200px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '16px'
                  }}>
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      {cust.name}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={12} />
                      <span>{cust.phone}</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cust.address}</span>
                  </div>
                  <div style={{ marginTop: '2px', color: 'var(--text-main)', fontWeight: 600 }}>
                    📦 {cust.totalOrders || 0} Orders • Spent: ₹{(cust.totalSpent || 0).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={cust.status === 'BLOCKED' ? 'badge-tag' : 'badge-tag badge-green'} style={{ fontSize: '0.7rem' }}>
                    {cust.status || 'ACTIVE'}
                  </span>
                  <button
                    onClick={() => updateCustomerStatus(cust.id, cust.status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card-subtle)',
                      color: cust.status === 'BLOCKED' ? '#10b981' : '#ef4444',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    title={cust.status === 'BLOCKED' ? 'Unblock customer' : 'Block customer'}
                  >
                    {cust.status === 'BLOCKED' ? <Unlock size={13} /> : <Lock size={13} />}
                  </button>
                  <button
                    onClick={() => deleteCustomer(cust.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      fontSize: '0.74rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VENDOR MANAGEMENT */}
      {activeTab === 'VENDORS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search shop, owner, APMC Mandi node..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.84rem'
                }}
              />
            </div>
            <button
              onClick={() => setIsAddVendorOpen(true)}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <Plus size={15} />
              <span>Add Mandi Vendor</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredVendors.map(vnd => (
              <div
                key={vnd.id}
                className="glass-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    🏪
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      {vnd.shopName}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Owner: {vnd.ownerName} • 📞 {vnd.phone}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <div>📍 {vnd.mandiLocation}</div>
                  <div style={{ marginTop: '2px', color: 'var(--text-main)', fontWeight: 600 }}>
                    License: {vnd.mandiLicense} • Comm: {vnd.commissionPct || 8.0}%
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  {/* Status Badge */}
                  <span
                    className={
                      vnd.kycStatus === 'APPROVED'
                        ? 'badge-tag badge-green'
                        : vnd.kycStatus === 'REJECTED'
                        ? 'badge-tag'
                        : 'badge-tag badge-gold'
                    }
                    style={{
                      fontSize: '0.72rem',
                      background: vnd.kycStatus === 'REJECTED' ? '#ef4444' : undefined,
                      color: vnd.kycStatus === 'REJECTED' ? '#ffffff' : undefined
                    }}
                  >
                    KYC {vnd.kycStatus}
                  </span>

                  {/* Approve / Re-Approve Action */}
                  {vnd.kycStatus !== 'APPROVED' ? (
                    <button
                      onClick={() => updateVendorKyc(vnd.id, 'APPROVED')}
                      className="btn-primary"
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.74rem',
                        background: '#10b981',
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Approve / Re-Approve Vendor"
                    >
                      <CheckCircle2 size={13} />
                      <span>{vnd.kycStatus === 'REJECTED' ? 'Re-Approve' : 'Approve'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => updateVendorKyc(vnd.id, 'REJECTED')}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #ef4444',
                        background: 'transparent',
                        color: '#ef4444',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Revoke / Reject Vendor"
                    >
                      <XCircle size={13} />
                      <span>Reject</span>
                    </button>
                  )}

                  {/* Direct Reject Action for Pending */}
                  {vnd.kycStatus === 'PENDING' && (
                    <button
                      onClick={() => updateVendorKyc(vnd.id, 'REJECTED')}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #ef4444',
                        background: 'transparent',
                        color: '#ef4444',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <XCircle size={13} />
                      <span>Reject</span>
                    </button>
                  )}

                  {/* Shop Open / Closed Toggle */}
                  <button
                    onClick={() => toggleVendorOpen(vnd.id)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)',
                      background: vnd.isOpen ? 'var(--primary)' : 'var(--bg-card-subtle)',
                      color: vnd.isOpen ? '#fff' : 'var(--text-muted)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {vnd.isOpen ? '🟢 Open' : '🔴 Closed'}
                  </button>

                  {/* Delete Vendor Button */}
                  <button
                    onClick={() => deleteVendor(vnd.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      fontSize: '0.74rem',
                      cursor: 'pointer'
                    }}
                    title="Delete Vendor"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RIDER FLEET MANAGEMENT */}
      {activeTab === 'RIDERS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search rider name, phone, EV bike..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.84rem'
                }}
              />
            </div>
            <button
              onClick={() => setIsAddRiderOpen(true)}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <Plus size={15} />
              <span>Add Rider</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredRiders.map(r => (
              <div
                key={r.id}
                className="glass-card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    🛵
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      {r.name}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      📞 {r.phone} • {r.vehicle}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <div>📍 Location: {r.currentLocation?.area || 'Jaipur Central'}</div>
                  <div style={{ marginTop: '2px', color: 'var(--text-main)', fontWeight: 600 }}>
                    ⚡ Trips: {r.tripsToday || 0} • Payout: ₹{(r.earningsToday || 0).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => toggleRiderDuty(r.id)}
                    className={r.isOnline ? 'btn-primary' : 'btn-secondary'}
                    style={{ padding: '6px 14px', fontSize: '0.74rem' }}
                  >
                    <Bike size={13} />
                    <span>{r.isOnline ? 'Online (On Duty)' : 'Offline'}</span>
                  </button>
                  <button
                    onClick={() => deleteRider(r.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      fontSize: '0.74rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ALL LIVE ORDERS */}
      {activeTab === 'ORDERS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
            📦 Platform Live Order Ledger ({orders.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {orders.map(o => (
              <div
                key={o.id}
                className="glass-card"
                style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary)' }}>
                      #{o.orderNumber || o.id}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
                      {new Date(o.createdAt || Date.now()).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge-tag badge-gold" style={{ fontSize: '0.72rem' }}>
                      {o.status}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                      ₹{o.totalAmount}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '10px', fontSize: '0.78rem' }}>
                  <div style={{ background: 'var(--bg-card-subtle)', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>👤 Customer: {o.customerName || 'Pooja Verma'}</div>
                    <div style={{ color: 'var(--text-muted)' }}>📞 {o.customerPhone || '+919928123456'}</div>
                    <div style={{ color: 'var(--text-muted)' }}>📍 {o.deliveryAddress}</div>
                  </div>
                  <div style={{ background: 'var(--bg-card-subtle)', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>🏪 Vendor: {o.vendorName || 'Sharma Fresh'}</div>
                    <div style={{ color: 'var(--text-muted)' }}>🛵 Rider: {o.deliveryPartnerName || 'Vikram Choudhary'}</div>
                    <div style={{ color: '#10b981', fontWeight: 700 }}>🔐 Delivery OTP: {o.deliveryOtp || '5819'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS & COUPONS */}
      {activeTab === 'SETTINGS' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
          {/* Commission Controller */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px', color: 'var(--text-main)' }}>
              ⚡ Platform Commission Take Rate
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Adjust global platform commission fee charged on each Mandi vegetable transaction.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
              <input
                type="range"
                min="2"
                max="20"
                step="0.5"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--primary)' }}
              />
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#8b5cf6', minWidth: '60px' }}>
                {commissionRate}%
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Estimated revenue at ₹1,00,000 GMV: <strong>₹{Math.round(100000 * commissionRate / 100)}</strong>
            </div>
          </div>

          {/* Coupon Generator */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                🏷️ Active Platform Promo Coupons
              </h3>
              <button
                onClick={() => setIsAddCouponOpen(true)}
                className="btn-primary"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                <Plus size={13} />
                <span>New Coupon</span>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {coupons.map(c => (
                <div key={c.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-card-subtle)', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em' }}>{c.code}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{c.discountPercent}% Off • Min order ₹{c.minOrder}</div>
                  </div>
                  <button
                    onClick={() => deleteCoupon(c.code)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD CUSTOMER */}
      {isAddCustomerOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddCustomerOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
              ➕ Register New Customer
            </h3>
            <form onSubmit={handleCustSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Jain"
                  value={custForm.name}
                  onChange={e => setCustForm({ ...custForm, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +919829012345"
                  value={custForm.phone}
                  onChange={e => setCustForm({ ...custForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Delivery Address</label>
                <input
                  type="text"
                  placeholder="e.g. Sector 5, Mansarovar, Jaipur"
                  value={custForm.address}
                  onChange={e => setCustForm({ ...custForm, address: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Customer</button>
                <button type="button" onClick={() => setIsAddCustomerOpen(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD VENDOR */}
      {isAddVendorOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddVendorOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
              🏪 Register Mandi Vendor Partner
            </h3>
            <form onSubmit={handleVendorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Shop Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Balaji Fresh Sabzi Bhandar"
                  value={vendorForm.shopName}
                  onChange={e => setVendorForm({ ...vendorForm, shopName: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Owner Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mukesh Meena"
                  value={vendorForm.ownerName}
                  onChange={e => setVendorForm({ ...vendorForm, ownerName: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +919829098765"
                  value={vendorForm.phone}
                  onChange={e => setVendorForm({ ...vendorForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Mandi Hub / Address</label>
                <input
                  type="text"
                  placeholder="e.g. APMC Muhana Mandi, Shed 4"
                  value={vendorForm.mandiLocation}
                  onChange={e => setVendorForm({ ...vendorForm, mandiLocation: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Register Vendor</button>
                <button type="button" onClick={() => setIsAddVendorOpen(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD RIDER */}
      {isAddRiderOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddRiderOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
              🛵 Add Delivery Rider Partner
            </h3>
            <form onSubmit={handleRiderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Rider Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deepak Saini"
                  value={riderForm.name}
                  onChange={e => setRiderForm({ ...riderForm, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +919928112233"
                  value={riderForm.phone}
                  onChange={e => setRiderForm({ ...riderForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Vehicle Model / Plate</label>
                <input
                  type="text"
                  placeholder="e.g. Hero Electric Nyx (RJ14-EV-1020)"
                  value={riderForm.vehicle}
                  onChange={e => setRiderForm({ ...riderForm, vehicle: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Add to Fleet</button>
                <button type="button" onClick={() => setIsAddRiderOpen(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD COUPON */}
      {isAddCouponOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddCouponOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
              🏷️ Create Promo Coupon Code
            </h3>
            <form onSubmit={handleCouponSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MANDI25"
                  value={couponForm.code}
                  onChange={e => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', textTransform: 'uppercase' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Discount %</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={couponForm.discountPercent}
                    onChange={e => setCouponForm({ ...couponForm, discountPercent: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Min Order (₹)</label>
                  <input
                    type="number"
                    min="99"
                    value={couponForm.minOrder}
                    onChange={e => setCouponForm({ ...couponForm, minOrder: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Activate Coupon</button>
                <button type="button" onClick={() => setIsAddCouponOpen(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
