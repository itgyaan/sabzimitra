import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Smartphone, 
  Lock, 
  KeyRound, 
  User, 
  Store, 
  Bike, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';

export const LoginModal = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    user, 
    login, 
    lang, 
    showToast,
    setRole 
  } = useApp();

  const [authRole, setAuthRole] = useState('CUSTOMER'); // 'CUSTOMER' | 'VENDOR' | 'DELIVERY_PARTNER' | 'ADMIN'
  const [step, setStep] = useState('PHONE'); // 'PHONE' | 'OTP'
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const roleConfigs = {
    CUSTOMER: {
      title: lang === 'hi' ? 'ग्राहक लॉगिन / साइन अप' : 'Customer Login / Sign Up',
      desc: lang === 'hi' ? 'ताज़ा सब्जियों के त्वरित ऑर्डर व डिलीवरी ट्रैकिंग के लिए' : 'Order fresh farm vegetables in 15 mins',
      color: '#10B981',
      icon: User,
      demoName: 'Pooja Verma',
      demoPhone: '9928123456'
    },
    VENDOR: {
      title: lang === 'hi' ? 'दुकानदार / किसान पोर्टल' : 'Vendor & Farmer Portal',
      desc: lang === 'hi' ? 'दैनिक मंडी भाव, इन्वेंट्री व लाइव ऑर्डर्स स्वीकार करने हेतु' : 'Manage mandi catalog, daily rates & sales',
      color: '#F59E0B',
      icon: Store,
      demoName: 'Sharma Fresh Sabzi Bhandar',
      demoPhone: '9829012345'
    },
    DELIVERY_PARTNER: {
      title: lang === 'hi' ? 'डिलीवरी साथी लॉगिन' : 'Delivery Partner App',
      desc: lang === 'hi' ? 'ऑनलाइन ड्यूटी, ट्रिप नेविगेशन व दैनिक कमाई वॉलेट' : 'Accept delivery trips & track payouts',
      color: '#3B82F6',
      icon: Bike,
      demoName: 'Vikram Choudhary (EV Rider)',
      demoPhone: '9887766554'
    },
    ADMIN: {
      title: lang === 'hi' ? 'सुपर एडमिन कमांड लॉगिन' : 'Super Admin Command',
      desc: lang === 'hi' ? 'प्लेटफॉर्म गवर्नेंस, KYC अप्रूवल व कमीशन सेटिंग्स' : 'Ecosystem governance & commission management',
      color: '#8B5CF6',
      icon: ShieldCheck,
      demoName: 'Chief Platform Administrator',
      demoEmail: 'admin@sabzimitra.com'
    }
  };

  const currentConfig = roleConfigs[authRole];

  // Send OTP handler
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (authRole === 'ADMIN') {
      // Admin direct login
      handleCompleteLogin('Chief Administrator', adminEmail || 'admin@sabzimitra.com');
      return;
    }

    if (!phone || phone.length < 10) {
      showToast('Invalid Phone', 'Please enter a valid 10-digit mobile number', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('OTP');
      showToast('OTP Sent', `6-digit verification code sent to +91 ${phone} (Demo Code: 123456)`, 'success');
    }, 600);
  };

  // OTP change handler
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Verify OTP & Login
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      showToast('Incomplete OTP', 'Please enter all 6 digits of the OTP', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      handleCompleteLogin(name || currentConfig.demoName, phone || currentConfig.demoPhone);
    }, 800);
  };

  const handleCompleteLogin = (userName, userContact) => {
    const userData = {
      id: `usr_${Date.now()}`,
      name: userName,
      contact: userContact,
      role: authRole,
      avatar: authRole === 'CUSTOMER' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        : authRole === 'VENDOR'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        : authRole === 'DELIVERY_PARTNER'
        ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      isAuthenticated: true
    };

    login(userData);
    setRole(authRole);
    setIsLoginModalOpen(false);
    setStep('PHONE');
    setOtp(['', '', '', '', '', '']);

    showToast(
      lang === 'hi' ? 'लॉगिन सफल!' : 'Login Successful!',
      `Welcome ${userData.name} to ${currentConfig.title}`
    );
  };

  // 1-Click Quick Demo Login
  const handleQuickDemoLogin = (roleKey) => {
    const cfg = roleConfigs[roleKey];
    setAuthRole(roleKey);
    handleCompleteLogin(cfg.demoName, cfg.demoPhone || cfg.demoEmail);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(8px)',
      padding: '16px'
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        className="animate-slide-up mobile-full-modal"
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          background: `linear-gradient(135deg, ${currentConfig.color}15 0%, ${currentConfig.color}05 100%)`,
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: currentConfig.color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              <currentConfig.icon size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {currentConfig.title}
              </h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: 0 }}>
                {currentConfig.desc}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 4-Role Selector Tabs */}
        <div style={{ padding: '16px 20px 0 20px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '6px',
            background: 'var(--bg-card-subtle)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            {[
              { key: 'CUSTOMER', label: 'Customer', icon: User },
              { key: 'VENDOR', label: 'Vendor', icon: Store },
              { key: 'DELIVERY_PARTNER', label: 'Rider', icon: Bike },
              { key: 'ADMIN', label: 'Admin', icon: ShieldCheck }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = authRole === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => { setAuthRole(tab.key); setStep('PHONE'); }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isSelected ? 'var(--bg-card)' : 'transparent',
                    color: isSelected ? roleConfigs[tab.key].color : 'var(--text-muted)',
                    fontWeight: isSelected ? 800 : 500,
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form Container */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {authRole === 'ADMIN' ? (
            /* Admin Credentials Form */
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Admin Official Email
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@sabzimitra.com"
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 38px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.88rem',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Admin Security Passcode
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 38px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.88rem',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.94rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
                }}
              >
                <span>Login to Admin Command Center</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : step === 'PHONE' ? (
            /* Phone / Mobile Form */
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {lang === 'hi' ? 'आपका नाम (वैकल्पिक)' : 'Your Full Name (Optional)'}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={currentConfig.demoName}
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 38px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.88rem',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {lang === 'hi' ? '10-अंकीय मोबाइल नंबर' : '10-Digit Mobile Number'}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>🇮🇳 +91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 72px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      letterSpacing: '1px'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.94rem',
                  borderRadius: 'var(--radius-md)',
                  background: currentConfig.color ? `linear-gradient(135deg, ${currentConfig.color} 0%, ${currentConfig.color}dd 100%)` : undefined
                }}
              >
                <span>{isSubmitting ? 'Sending SMS OTP...' : (lang === 'hi' ? 'ओटीपी प्राप्त करें' : 'Get Verification OTP')}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* OTP Verification Screen */
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <span className="badge-tag badge-green" style={{ marginBottom: '6px' }}>
                  OTP SENT TO +91 {phone}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Enter the 6-digit code received via SMS (Demo OTP: <strong>123456</strong>)
                </p>
              </div>

              {/* 6-Digit OTP Box inputs */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    style={{
                      width: '44px',
                      height: '50px',
                      borderRadius: '10px',
                      border: digit ? `2px solid ${currentConfig.color}` : '1px solid var(--border-color)',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      textAlign: 'center',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)'
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                <button
                  type="button"
                  onClick={() => setStep('PHONE')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  ← Change Number
                </button>
                <button
                  type="button"
                  onClick={() => showToast('OTP Resent', 'Demo OTP: 123456')}
                  style={{ background: 'transparent', border: 'none', color: currentConfig.color, fontWeight: 700, cursor: 'pointer' }}
                >
                  Resend OTP (30s)
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.94rem',
                  borderRadius: 'var(--radius-md)',
                  background: currentConfig.color
                }}
              >
                <span>{isSubmitting ? 'Verifying...' : (lang === 'hi' ? 'सत्यापित करें व लॉगिन करें' : 'Verify & Login')}</span>
                <CheckCircle2 size={16} />
              </button>
            </form>
          )}

          {/* Quick 1-Click Demo Login Shortcuts */}
          <div style={{
            background: 'var(--bg-card-subtle)',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={14} style={{ color: '#f59e0b' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-main)' }}>
                ⚡ 1-Click Instant Demo Logins (No OTP Required)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('CUSTOMER')}
                style={{
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #10B981',
                  background: '#ecfdf5',
                  color: '#065f46',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                🛒 Pooja (Customer)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('VENDOR')}
                style={{
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #f59e0b',
                  background: '#fef3c7',
                  color: '#92400e',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                🏪 Sharma (Vendor)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('DELIVERY_PARTNER')}
                style={{
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #3b82f6',
                  background: '#eff6ff',
                  color: '#1e40af',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                🛵 Vikram (Rider)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('ADMIN')}
                style={{
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #8b5cf6',
                  background: '#f5f3ff',
                  color: '#5b21b6',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                🛡️ Super Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
