import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 size={20} style={{ color: '#10b981' }} />,
    error: <AlertCircle size={20} style={{ color: '#ef4444' }} />,
    warning: <AlertCircle size={20} style={{ color: '#f59e0b' }} />,
    info: <Info size={20} style={{ color: '#3b82f6' }} />
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'var(--bg-card)',
        color: 'var(--text-main)',
        padding: '14px 20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '420px'
      }}
      className="animate-slide-up"
    >
      {icons[toastMessage.type] || icons.success}
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
          {toastMessage.title}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
          {toastMessage.message}
        </p>
      </div>
    </div>
  );
};
