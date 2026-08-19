import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KycModal } from './KycModal';
import { 
  Store, 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Edit3, 
  Save, 
  Plus,
  RefreshCw,
  Coins,
  Sparkles,
  Bike
} from 'lucide-react';

export const VendorDashboard = () => {
  const { 
    vendors, 
    products, 
    orders, 
    updateOrderStatus, 
    updateProductPrice, 
    setIsKycModalOpen, 
    lang 
  } = useApp();

  const currentVendor = vendors[0] || {
    shopName: 'Sharma Fresh Sabzi Bhandar',
    kycStatus: 'APPROVED',
    todayOrders: 18,
    todayGmv: 4850,
    rating: 4.8,
    mandiLocation: 'APMC Muhana Mandi, Gate 2, Jaipur'
  };

  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');

  // Orders assigned to this vendor
  const vendorOrders = orders.filter(o => !o.vendorId || o.vendorId === currentVendor.id);

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditPrice(p.pricePerKg);
    setEditStock(p.stockKg);
  };

  const saveEdit = (id) => {
    updateProductPrice(id, editPrice, editStock);
    setEditingId(null);
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <KycModal />

      {/* Vendor Profile & KYC Status Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        borderRadius: '24px',
        padding: '28px 32px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            🏪
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {currentVendor.shopName}
              </h2>
              <span className={`badge-tag ${currentVendor.kycStatus === 'APPROVED' ? 'badge-green' : 'badge-gold'}`}>
                {currentVendor.kycStatus === 'APPROVED' ? 'KYC VERIFIED' : 'KYC PENDING'}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '3px' }}>
              {currentVendor.mandiLocation} • License: {currentVendor.mandiLicense || 'MND-2026-99'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {currentVendor.kycStatus !== 'APPROVED' && (
            <button
              onClick={() => setIsKycModalOpen(true)}
              className="btn-primary"
              style={{ background: '#f59e0b' }}
            >
              <ShieldCheck size={16} />
              <span>Complete Mandi KYC</span>
            </button>
          )}

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
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            <span>Mandi Live Connected</span>
          </div>
        </div>
      </div>

      {/* KPI Counters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Today's Sales (GMV)</span>
            <Coins size={18} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--text-main)' }}>
            ₹{currentVendor.todayGmv || 4850}
          </div>
          <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 600 }}>
            +18% higher than yesterday
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Today's Orders</span>
            <Package size={18} style={{ color: '#3b82f6' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--text-main)' }}>
            {vendorOrders.length}
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            {vendorOrders.filter(o => o.status !== 'DELIVERED').length} active currently
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Produce Quality Rating</span>
            <Sparkles size={18} style={{ color: '#f59e0b' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--text-main)' }}>
            4.8 ★
          </div>
          <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 600 }}>
            Top 5% Mandi Vendor
          </span>
        </div>
      </div>

      {/* Live Incoming Orders Processing Board */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {lang === 'hi' ? '📦 लाइव आने वाले ऑर्डर्स (Live Queue)' : '📦 Live Order Processing Queue'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Accept, ozone-wash, pack, and prepare for delivery partner pickup
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {vendorOrders.map(order => (
            <div
              key={order.id}
              className="glass-card"
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderLeft: order.status === 'PLACED' ? '4px solid #f59e0b' : '4px solid var(--primary)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    Order #{order.orderNumber}
                  </h4>
                  <span className={`badge-tag ${order.status === 'DELIVERED' ? 'badge-green' : 'badge-gold'}`}>
                    {order.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Customer: <strong>{order.customerName || 'Pooja Verma'}</strong> ({order.customerPhone || '+91 9928123456'}) • Total: <strong>₹{order.totalAmount}</strong> ({order.paymentMode || 'UPI'})
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  📍 Delivery Drop: <strong>{order.deliveryAddress || 'Flat 402, Green Valley Apartments, Malviya Nagar, Jaipur'}</strong>
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {order.items?.map((item, i) => (
                    <span key={i} className="badge-tag" style={{ background: 'var(--bg-card-subtle)', color: 'var(--text-main)' }}>
                      {item.name || item.nameEn} ({item.portion || `${item.qty || 1} pack`})
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons for Vendor workflow */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {order.status === 'PLACED' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'PACKED')}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                  >
                    <CheckCircle2 size={15} />
                    <span>Accept & Pack Order</span>
                  </button>
                )}

                {order.status === 'PACKED' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'OUT_FOR_DELIVERY')}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.84rem', background: '#3b82f6' }}
                  >
                    <Bike size={15} />
                    <span>Handover to Delivery Rider</span>
                  </button>
                )}

                {order.status === 'OUT_FOR_DELIVERY' && (
                  <span className="badge-tag badge-green" style={{ padding: '8px 14px' }}>
                    🛵 Rider On Route (OTP: {order.deliveryOtp})
                  </span>
                )}

                {order.status === 'DELIVERED' && (
                  <span className="badge-tag badge-green" style={{ padding: '8px 14px' }}>
                    ✓ Fulfilled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produce & Daily Mandi Rate Updater Table */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {lang === 'hi' ? '🥦 दैनिक मंडी भाव व स्टॉक प्रबंधन' : '🥦 Daily Mandi Rate & Stock Manager'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Update morning prices based on APMC auction & toggle available harvest stock
            </p>
          </div>
        </div>

        {/* Responsive Produce & Daily Mandi Rate Updater Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {products.map(p => {
            const isEditing = editingId === p.id;
            return (
              <div
                key={p.id}
                className="glass-card"
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  border: isEditing ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                  background: isEditing ? 'var(--primary-light)' : 'var(--bg-card)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Top Row: Image, Name, Freshness, Category */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={p.image}
                      alt={p.nameEn}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                        {lang === 'hi' ? p.nameHi : p.nameEn}
                      </h4>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                        {lang === 'hi' ? p.nameEn : p.nameHi} • <span style={{ color: '#10b981', fontWeight: 600 }}>{p.freshness}</span>
                      </p>
                    </div>
                  </div>

                  <span className="badge-tag" style={{ background: 'var(--bg-card-subtle)', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    {p.category}
                  </span>
                </div>

                {/* Rates & Stock Details Row */}
                <div style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                  gap: '10px',
                  alignItems: 'center',
                  border: '1px solid var(--border-subtle)'
                }}>
                  {/* Mandi Rate */}
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                      Mandi Rate (APMC)
                    </span>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      ₹{p.mandiRatePerKg}/kg
                    </span>
                  </div>

                  {/* Our Selling Price */}
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                      {lang === 'hi' ? 'हमारा भाव' : 'Selling Price'}
                    </span>
                    {isEditing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--primary)' }}>₹</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          placeholder="Price"
                          style={{
                            width: '74px',
                            padding: '6px 8px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--primary)',
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            background: 'var(--bg-card)',
                            color: 'var(--text-main)',
                            outline: 'none',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                        />
                      </div>
                    ) : (
                      <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                        ₹{p.pricePerKg}/kg
                      </strong>
                    )}
                  </div>

                  {/* Available Stock */}
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                      {lang === 'hi' ? 'उपलब्ध स्टॉक' : 'Available Stock'}
                    </span>
                    {isEditing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(e.target.value)}
                          placeholder="Stock"
                          style={{
                            width: '74px',
                            padding: '6px 8px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--primary)',
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            background: 'var(--bg-card)',
                            color: 'var(--text-main)',
                            outline: 'none',
                            boxShadow: 'var(--shadow-sm)'
                          }}
                        />
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>kg</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {p.stockKg} kg
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Bottom Bar */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn-secondary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem', minHeight: '34px' }}
                      >
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={() => saveEdit(p.id)}
                        className="btn-primary"
                        style={{ padding: '6px 16px', fontSize: '0.8rem', minHeight: '34px' }}
                      >
                        <Save size={14} />
                        <span>Save Rate & Stock</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEdit(p)}
                      className="btn-secondary"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        minHeight: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Edit3 size={14} style={{ color: 'var(--primary)' }} />
                      <span>{lang === 'hi' ? 'भाव व स्टॉक बदलें' : 'Update Rate / Stock'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
