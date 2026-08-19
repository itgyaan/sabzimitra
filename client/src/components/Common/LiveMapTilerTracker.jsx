import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, LocateFixed, Store, Bike, Home, Navigation, Clock } from 'lucide-react';

const MAPTILER_KEY = 'MsX5E5sG2GFTtK8L6GRT';

export const LiveMapTilerTracker = ({ 
  status = 'OUT_FOR_DELIVERY',
  vendorName = 'Sharma Fresh Sabzi Bhandar',
  customerName = 'Pooja Verma',
  height = '270px'
}) => {
  const { userLocation, requestUserLocation, lang } = useApp();
  const [isLocating, setIsLocating] = useState(false);

  const custLat = userLocation?.lat || 26.8525;
  const custLng = userLocation?.lng || 75.8235;
  const custAddress = userLocation?.address || 'Malviya Nagar, Jaipur';

  const centerLng = (75.8056 + custLng) / 2;
  const centerLat = (26.8289 + custLat) / 2;

  // High-Resolution MapTiler Streets Static Map URL with user's MapTiler Key
  const mapUrl = `https://api.maptiler.com/maps/streets-v2/static/${centerLng.toFixed(4)},${centerLat.toFixed(4)},13.2/800x400@2x.png?key=${MAPTILER_KEY}`;

  const handleLocateMe = (e) => {
    e.stopPropagation();
    setIsLocating(true);
    requestUserLocation(false);
    setTimeout(() => {
      setIsLocating(false);
    }, 1500);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height,
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-md)',
      background: '#1e293b'
    }}>
      {/* Real MapTiler Street Map Image Layer */}
      <img
        src={mapUrl}
        alt="MapTiler Jaipur Street Map"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.92) contrast(1.05)',
          display: 'block'
        }}
        onError={(e) => {
          e.target.style.opacity = '0.3';
        }}
      />

      {/* SVG Interactive Overlay with Mandi, Rider & Customer Pins */}
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {/* Dynamic Route Line */}
        <path
          d="M 65 145 Q 160 50, 240 125 T 345 65"
          fill="none"
          stroke="rgba(16, 185, 129, 0.35)"
          strokeWidth="8"
          strokeDasharray="8 8"
        />
        <path
          d="M 65 145 Q 160 50, 240 125 T 345 65"
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 🏪 Mandi Hub Pin (Left) */}
        <g transform="translate(65, 145)">
          <circle r="16" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
          <text textAnchor="middle" y="5" fill="#ffffff" fontSize="12" fontWeight="bold">🏪</text>
        </g>

        {/* 🏠 Customer Doorstep Pin (Right) */}
        <g transform="translate(345, 65)">
          <circle r="16" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
          <text textAnchor="middle" y="5" fill="#ffffff" fontSize="12" fontWeight="bold">🏠</text>
        </g>

        {/* 🛵 Live Moving Rider Marker */}
        {status !== 'DELIVERED' && (
          <g transform={status === 'PLACED' ? "translate(85, 135)" : status === 'PACKED' ? "translate(140, 75)" : "translate(245, 115)"}>
            <circle r="18" fill="rgba(16, 185, 129, 0.4)" className="pulse-animation" />
            <circle r="14" fill="#059669" stroke="#ffffff" strokeWidth="2.5" />
            <text textAnchor="middle" y="4" fill="#ffffff" fontSize="11" fontWeight="bold">🛵</text>
          </g>
        )}
      </svg>

      {/* Floating Header Badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        background: 'rgba(15, 23, 42, 0.88)',
        color: '#ffffff',
        padding: '6px 14px',
        borderRadius: 'var(--radius-full)',
        backdropFilter: 'blur(8px)',
        fontSize: '0.74rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.15)'
      }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
        <span>MapTiler Live GPS • {userLocation?.isLiveGps ? 'Device GPS' : 'Jaipur Hub'}</span>
      </div>

      {/* Floating Locate Button */}
      <button
        onClick={handleLocateMe}
        disabled={isLocating}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: userLocation?.isLiveGps ? '#10b981' : 'rgba(15, 23, 42, 0.92)',
          color: '#ffffff',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)',
          backdropFilter: 'blur(8px)',
          fontSize: '0.74rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease',
          pointerEvents: 'auto'
        }}
      >
        <LocateFixed size={14} className={isLocating ? 'spin-animation' : ''} style={{ color: '#ffffff' }} />
        <span>{isLocating ? 'Locating...' : (userLocation?.isLiveGps ? 'GPS Active' : '📍 Allow GPS')}</span>
      </button>

      {/* Bottom Route Summary Bar */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '12px',
        right: '12px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '6px 12px',
        borderRadius: '12px',
        color: '#ffffff',
        fontSize: '0.72rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '6px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🏪 {vendorName}</span>
          <span>➔</span>
          <span>🏠 {custAddress.slice(0, 24)}...</span>
        </div>
        <div style={{ color: '#34d399', fontWeight: 800 }}>
          ⚡ 15 Mins Superfast Delivery
        </div>
      </div>
    </div>
  );
};
