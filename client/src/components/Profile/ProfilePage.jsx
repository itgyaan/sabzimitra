import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  LogOut, 
  UserCheck, 
  Receipt,
  KeyRound,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ProfilePage = () => {
  const { 
    user, 
    updateUserProfile, 
    orders, 
    role, 
    setRole, 
    lang, 
    setLang, 
    theme, 
    setTheme, 
    logout, 
    setIsLoginModalOpen, 
    addToCart, 
    setIsCartOpen,
    setActiveOrderId,
    showToast, 
    t 
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'edit' | 'settings'

  // Editable Profile Form State
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.contact || user.phone || '+91 9928123456');
  const [email, setEmail] = useState(user.email || 'pooja.verma@example.com');
  const [address, setAddress] = useState(user.address || 'Flat 402, Green Valley Apartments, Malviya Nagar, Jaipur');
  const [mandiLocation, setMandiLocation] = useState(user.mandiLocation || 'APMC Muhana Mandi, Gate 2, Jaipur');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');

  const avatarOptions = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      contact: phone,
      phone,
      email,
      address,
      mandiLocation,
      avatar: selectedAvatar
    });
  };

  const handleReorder = (order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach(item => {
        addToCart(item, item.portion || '1 kg', 1);
      });
      setIsCartOpen(true);
      showToast(
        lang === 'hi' ? 'सामान थैले में जोड़ा गया' : 'Items Added to Basket',
        `Reordered ${order.items.length} items from Order #${order.orderNumber}`
      );
    }
  };

  const handleTrackOrder = (orderId) => {
    setActiveOrderId(orderId);
    setRole('CUSTOMER');
    const trackElem = document.getElementById('order-tracking-section');
    if (trackElem) trackElem.scrollIntoView({ behavior: 'smooth' });
  };

  // Stats
  const completedOrders = orders.filter(o => o.status === 'DELIVERED');
  const activeOrders = orders.filter(o => o.status !== 'DELIVERED');
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div style={{ padding: '20px 0 60px 0' }} className="animate-slide-up">
      {/* Top Header Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <button
          onClick={() => setRole('CUSTOMER')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-main)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <ArrowLeft size={16} />
          <span>{lang === 'hi' ? 'दुकान पर वापस जाएं' : 'Back to Store'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge-tag badge-green">
            {user.role === 'CUSTOMER' ? '🛒 Customer' : user.role === 'VENDOR' ? '🏪 Mandi Vendor' : user.role === 'DELIVERY_PARTNER' ? '🛵 Delivery Partner' : '🛡️ Admin'}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            ID: #{user.id || 'usr-cust-1'}
          </span>
        </div>
      </div>

      {/* Main Profile Summary Banner Card */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%)',
        color: '#ffffff',
        borderRadius: '24px',
        padding: 'clamp(20px, 4vw, 30px)',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          position: 'relative',
          zIndex: 2
        }}>
          {/* User Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={selectedAvatar}
                alt={name}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #34d399',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                }}
              />
              <span style={{
                position: 'absolute',
                bottom: '2px',
                right: '4px',
                width: '14px',
                height: '14px',
                background: '#10b981',
                border: '2.5px solid #064e3b',
                borderRadius: '50%'
              }} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  {name}
                </h2>
                <span className="badge-tag" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                  PRO MEMBER
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.88)', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span>📞 {phone}</span>
                <span>•</span>
                <span>✉️ {email}</span>
              </p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} />
                <span>{address}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'flex',
            gap: '12px',
            background: 'rgba(0,0,0,0.25)',
            padding: '10px 16px',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ textAlign: 'center', paddingRight: '12px', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Orders</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{orders.length}</div>
            </div>
            <div style={{ textAlign: 'center', paddingRight: '12px', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Active</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{activeOrders.length}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Total Spent</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>₹{totalSpent}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '12px',
        overflowX: 'auto'
      }} className="no-scrollbar">
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            border: activeTab === 'orders' ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
            background: activeTab === 'orders' ? 'var(--primary)' : 'var(--bg-card)',
            color: activeTab === 'orders' ? '#fff' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.86rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: activeTab === 'orders' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          <Package size={16} />
          <span>{lang === 'hi' ? '📦 मेरे ऑर्डर्स व ट्रैकिंग' : '📦 My Orders & History'} ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            border: activeTab === 'edit' ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
            background: activeTab === 'edit' ? 'var(--primary)' : 'var(--bg-card)',
            color: activeTab === 'edit' ? '#fff' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.86rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: activeTab === 'edit' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          <User size={16} />
          <span>{lang === 'hi' ? '✏️ नाम व पता बदलें' : '✏️ Edit Profile & Address'}</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            border: activeTab === 'settings' ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
            background: activeTab === 'settings' ? 'var(--primary)' : 'var(--bg-card)',
            color: activeTab === 'settings' ? '#fff' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.86rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: activeTab === 'settings' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          <Globe size={16} />
          <span>{lang === 'hi' ? '⚙️ सेटिंग्स व रोल' : '⚙️ Settings & Role'}</span>
        </button>
      </div>

      {/* TAB 1: Orders & History */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🥬</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
                {lang === 'hi' ? 'कोई पुराना ऑर्डर नहीं मिला' : 'No Orders Found'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {lang === 'hi' ? 'ताज़ी मंडी सब्जियां अभी ऑर्डर करें।' : 'Order fresh farm veggies delivered in 15 minutes.'}
              </p>
              <button onClick={() => setRole('CUSTOMER')} className="btn-primary">
                {lang === 'hi' ? 'सब्जियां खरीदें' : 'Start Shopping'}
              </button>
            </div>
          ) : (
            orders.map(order => {
              const isDelivered = order.status === 'DELIVERED';
              return (
                <div
                  key={order.id}
                  className="glass-card"
                  style={{
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    borderLeft: isDelivered ? '4px solid #10b981' : '4px solid #f59e0b'
                  }}
                >
                  {/* Order Top Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                        Order #{order.orderNumber}
                      </h4>
                      <span className={`badge-tag ${isDelivered ? 'badge-green' : 'badge-gold'}`}>
                        {order.status === 'DELIVERED' ? '✓ DELIVERED' : order.status === 'OUT_FOR_DELIVERY' ? '🛵 ON THE WAY' : '⚡ ' + order.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)' }}>
                      ₹{order.totalAmount}
                    </div>
                  </div>

                  {/* Order Vendor & Address Details */}
                  <div style={{
                    background: 'var(--bg-card-subtle)',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}>
                    <div>
                      <strong>Mandi Vendor:</strong> {order.vendorName || 'Sharma Fresh Sabzi Bhandar'}
                    </div>
                    <div>
                      <strong>Delivery Address:</strong> {order.deliveryAddress || address}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                      <span>Payment: <strong>{order.paymentMode || 'PHONEPE_UPI'}</strong></span>
                      {!isDelivered && (
                        <span style={{ color: 'var(--primary)', fontWeight: 800 }}>
                          Delivery OTP: <strong>{order.deliveryOtp}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Items ({order.items?.length || 0})
                    </span>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {order.items?.map((item, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--text-main)'
                          }}
                        >
                          {item.name || item.nameEn} ({item.portion || `${item.qty || 1} pack`})
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', flexWrap: 'wrap', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                    {!isDelivered ? (
                      <button
                        onClick={() => handleTrackOrder(order.id)}
                        className="btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                      >
                        <MapPin size={14} />
                        <span>{lang === 'hi' ? 'लाइव ट्रैक करें' : 'Track Live GPS'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReorder(order)}
                        className="btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                      >
                        <RotateCcw size={14} />
                        <span>{lang === 'hi' ? 'दोबारा ऑर्डर करें' : 'Reorder Items'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: Edit Profile & Address Form */}
      {activeTab === 'edit' && (
        <div className="glass-card" style={{ padding: 'clamp(18px, 4vw, 28px)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            {lang === 'hi' ? '✏️ अपनी जानकारी अपडेट करें' : '✏️ Edit Personal Details & Address'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            {lang === 'hi' ? 'यहाँ किया गया बदलाव आपके सभी भविष्य के ऑर्डर्स पर लागू होगा।' : 'Changes made here will apply to your orders and invoices.'}
          </p>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Avatar Picker */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                {lang === 'hi' ? 'प्रोफ़ाइल फोटो चुनें' : 'Choose Profile Picture'}
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {avatarOptions.map((av, i) => (
                  <img
                    key={i}
                    src={av}
                    alt={`Avatar ${i}`}
                    onClick={() => setSelectedAvatar(av)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedAvatar === av ? '3px solid var(--primary)' : '2px solid var(--border-color)',
                      boxShadow: selectedAvatar === av ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Name & Phone Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '16px'
            }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {lang === 'hi' ? 'पूरा नाम (Full Name)' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {lang === 'hi' ? 'मोबाइल नंबर (Phone)' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            {/* Primary Delivery Address */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                {lang === 'hi' ? 'मुख्य डिलीवरी पता (Delivery Address)' : 'Primary Delivery Address (Home/Office)'}
              </label>
              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Nearest Mandi Location */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                {lang === 'hi' ? 'निकटतम मंडी (Nearby Mandi Node)' : 'Preferred APMC Mandi Node'}
              </label>
              <input
                type="text"
                value={mandiLocation}
                onChange={(e) => setMandiLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '0.92rem',
                borderRadius: '12px',
                alignSelf: 'flex-start',
                marginTop: '6px'
              }}
            >
              <Save size={16} />
              <span>{lang === 'hi' ? 'जानकारी सुरक्षित करें' : 'Save Changes'}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Preferences, Role Switch & Settings */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Role Switcher */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
              {lang === 'hi' ? '🔄 सक्रिय रोल बदलें' : '🔄 Switch Active Mode / Role'}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Experience the platform from any perspective:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '10px'
            }}>
              {[
                { id: 'CUSTOMER', label: '🛒 Customer', desc: 'Shop veggies' },
                { id: 'VENDOR', label: '🏪 Mandi Vendor', desc: 'Manage prices' },
                { id: 'DELIVERY_PARTNER', label: '🛵 Rider', desc: 'Live trips' },
                { id: 'ADMIN', label: '🛡️ Super Admin', desc: 'Governance' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    showToast('Role Switched', `Switched to ${r.label} Mode`);
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: role === r.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: role === r.id ? 'var(--primary-light)' : 'var(--bg-card)',
                    color: role === r.id ? 'var(--primary)' : 'var(--text-main)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  <div>{r.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Language Box */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
              {lang === 'hi' ? '🌐 भाषा और थीम प्राथमिकताएं' : '🌐 Language & Theme Preferences'}
            </h4>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {/* Language Switch */}
              <button
                onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card-subtle)',
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                <Globe size={16} style={{ color: 'var(--primary)' }} />
                <span>Language: <strong>{lang === 'hi' ? 'हिन्दी (Hindi)' : 'English'}</strong></span>
              </button>

              {/* Theme Switch */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card-subtle)',
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                {theme === 'dark' ? <Sun size={16} style={{ color: '#f59e0b' }} /> : <Moon size={16} style={{ color: '#3b82f6' }} />}
                <span>Theme: <strong>{theme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</strong></span>
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ef4444', margin: 0 }}>
                {lang === 'hi' ? 'खाता लॉगआउट' : 'Sign Out of Account'}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Securely disconnect this device session
              </p>
            </div>

            <button
              onClick={logout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                border: '1.5px solid #ef4444',
                background: 'transparent',
                color: '#ef4444',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer'
              }}
            >
              <LogOut size={16} />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
