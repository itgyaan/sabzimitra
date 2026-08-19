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
  Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    vendors, 
    orders, 
    products, 
    coupons, 
    updateVendorKyc, 
    commissionRate, 
    setCommissionRate, 
    lang, 
    showToast 
  } = useApp();

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newDiscountVal, setNewDiscountVal] = useState(50);
  const [minOrder, setMinOrder] = useState(199);

  // Platform Analytics Calculations
  const totalGmv = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 48500;
  const platformRevenue = Math.round((totalGmv * commissionRate) / 100);
  const pendingVendors = vendors.filter(v => v.kycStatus === 'PENDING');
  const approvedVendors = vendors.filter(v => v.kycStatus === 'APPROVED');

  const handleApprove = (vId) => {
    updateVendorKyc(vId, 'APPROVED');
    showToast('Vendor Approved', 'Vendor KYC approved and catalog activated on platform', 'success');
  };

  const handleReject = (vId) => {
    updateVendorKyc(vId, 'REJECTED');
    showToast('Vendor Rejected', 'Vendor KYC application rejected', 'error');
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    showToast('Coupon Created', `New promo code ${newCouponCode.toUpperCase()} activated platform-wide!`, 'success');
    setNewCouponCode('');
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      {/* Admin Command Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
        color: '#ffffff',
        borderRadius: '24px',
        padding: '28px 32px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px'
          }}>
            🛡️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {lang === 'hi' ? 'सुपर एडमिन कमांड सेंटर' : 'Super Admin Command Center'}
              </h2>
              <span className="badge-tag" style={{ background: '#10b981', color: '#fff' }}>
                LIVE 99.9% UPTIME
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#c4b5fd', marginTop: '2px' }}>
              Platform Governance, KYC Verifications & Ecosystem Commission Control
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          backdropFilter: 'blur(8px)'
        }}>
          <Activity size={15} style={{ color: '#34d399' }} />
          <span>Jaipur APMC Region Node #1</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Total Platform GMV</span>
            <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--text-main)' }}>
            ₹{totalGmv.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 600 }}>
            +24.5% this week
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Platform Commission</span>
            <DollarSign size={18} style={{ color: '#8b5cf6' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#8b5cf6' }}>
            ₹{platformRevenue.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            At {commissionRate}% take rate
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Active Mandi Vendors</span>
            <Store size={18} style={{ color: '#f59e0b' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--text-main)' }}>
            {approvedVendors.length} / {vendors.length}
          </div>
          <span style={{ fontSize: '0.74rem', color: pendingVendors.length > 0 ? '#ef4444' : '#16a34a', fontWeight: 600 }}>
            {pendingVendors.length} Pending KYC
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Delivery Fleet</span>
            <Bike size={18} style={{ color: '#3b82f6' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--text-main)' }}>
            18 Active EV Riders
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Avg ETA: 13.8 Mins
          </span>
        </div>
      </div>

      {/* Main Sections: KYC Verification Queue & Commission Adjuster */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {/* Vendor KYC Review Portal */}
        <section className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {lang === 'hi' ? '📝 वेंडर KYC अप्रूवल कतार' : '📝 Vendor KYC Verification Queue'}
            </h3>
            <span className="badge-tag badge-gold">
              {pendingVendors.length} PENDING
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {vendors.map(vendor => (
              <div
                key={vendor.id}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {vendor.shopName}
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Owner: {vendor.ownerName} • Mandi: {vendor.mandiLocation}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    License: <strong>{vendor.mandiLicense}</strong> | Aadhaar: <strong>{vendor.aadhaarNumber}</strong>
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {vendor.kycStatus === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleApprove(vendor.id)}
                        className="btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                      >
                        <CheckCircle2 size={14} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(vendor.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid #ef4444',
                          background: 'transparent',
                          color: '#ef4444',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <XCircle size={14} />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className={`badge-tag ${vendor.kycStatus === 'APPROVED' ? 'badge-green' : 'badge-gold'}`}>
                      {vendor.kycStatus}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Commission Settings & Coupon Generator */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Commission Slider */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sliders size={18} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'कमीशन दर सेटिंग्स' : 'Platform Take-Rate / Commission'}
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Current Platform Commission deducted per Mandi vendor sale: <strong>{commissionRate}%</strong>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input
                type="range"
                min="5.0"
                max="15.0"
                step="0.5"
                value={commissionRate}
                onChange={(e) => {
                  setCommissionRate(Number(e.target.value));
                  showToast('Commission Updated', `Platform take-rate set to ${e.target.value}%`);
                }}
                style={{ flex: 1, accentColor: 'var(--primary)' }}
              />
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', minWidth: '55px' }}>
                {commissionRate}%
              </span>
            </div>
          </div>

          {/* Quick Coupon Creator */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Tag size={18} style={{ color: '#8b5cf6' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'नया डिस्काउंट कूपन बनाएं' : 'Create Promotional Promo Code'}
              </h3>
            </div>

            <form onSubmit={handleCreateCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  placeholder="CODE (e.g. DIWALI25)"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.84rem'
                  }}
                />
                <input
                  type="number"
                  required
                  value={newDiscountVal}
                  onChange={(e) => setNewDiscountVal(e.target.value)}
                  placeholder="Discount ₹"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.84rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px', fontSize: '0.85rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}
              >
                + Activate Coupon Campaign
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
