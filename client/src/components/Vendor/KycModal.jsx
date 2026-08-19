import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Building, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const KycModal = () => {
  const { isKycModalOpen, setIsKycModalOpen, vendors, updateVendorKyc, lang, showToast } = useApp();
  const currentVendor = vendors[0];

  const [shopName, setShopName] = useState(currentVendor?.shopName || 'Sharma Fresh Sabzi Bhandar');
  const [ownerName, setOwnerName] = useState(currentVendor?.ownerName || 'Ramesh Sharma');
  const [mandiLicense, setMandiLicense] = useState(currentVendor?.mandiLicense || 'MND-JPR-2024-88');
  const [aadhaar, setAadhaar] = useState('XXXX-XXXX-4589');
  const [bankAccount, setBankAccount] = useState('SBIN000291039');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isKycModalOpen) return null;

  const handleSubmitKyc = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      updateVendorKyc(currentVendor.id, 'APPROVED');
      setIsKycModalOpen(false);
      showToast('KYC Verified', 'Mandi Vendor credentials verified and approved for live orders!', 'success');
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      padding: '16px'
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '540px',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="animate-slide-up"
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.04) 100%)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#f59e0b',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'दुकानदार / किसान KYC सत्यापन' : 'Vendor Mandi KYC Onboarding'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Official APMC Mandi License & Identity Verification
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsKycModalOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmitKyc} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
              Mandi Shop / Farm Outlet Name
            </label>
            <input
              type="text"
              required
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.88rem',
                background: 'var(--bg-card)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Owner / Farmer Name
              </label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Mandi Trade License No.
              </label>
              <input
                type="text"
                required
                value={mandiLicense}
                onChange={(e) => setMandiLicense(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Masked Aadhaar Number
              </label>
              <input
                type="text"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Bank Payout Account
              </label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)'
                }}
              />
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card-subtle)',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={18} style={{ color: '#f59e0b' }} />
            <span>Direct daily payouts sent to linked bank account post mandi settlement.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '0.96rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            }}
          >
            {isSubmitting ? 'Verifying Mandi Records...' : 'Submit & Activate KYC'}
          </button>
        </form>
      </div>
    </div>
  );
};
