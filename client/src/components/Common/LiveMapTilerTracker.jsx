import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, MapPin, Compass, LocateFixed } from 'lucide-react';

const MAPTILER_KEY = 'MsX5E5sG2GFTtK8L6GRT';

// APMC Muhana Mandi, Jaipur Hub
const MANDI_COORDS = [26.8289, 75.8056];

export const LiveMapTilerTracker = ({ 
  status = 'OUT_FOR_DELIVERY',
  vendorName = 'Sharma Fresh Sabzi Bhandar',
  customerName = 'Pooja Verma',
  height = '280px'
}) => {
  const { userLocation, requestUserLocation, lang } = useApp();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const customerMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const animFrameRef = useRef(null);
  const [isLocating, setIsLocating] = useState(false);

  // Target Customer coordinates (from real GPS or default)
  const custLat = userLocation?.lat || 26.8525;
  const custLng = userLocation?.lng || 75.8235;
  const custAddress = userLocation?.address || 'Malviya Nagar, Jaipur';

  // Dynamic waypoint calculation between Mandi Hub and Customer
  const routePoints = [
    MANDI_COORDS,
    [MANDI_COORDS[0] + (custLat - MANDI_COORDS[0]) * 0.25, MANDI_COORDS[1] + (custLng - MANDI_COORDS[1]) * 0.25 + 0.002],
    [MANDI_COORDS[0] + (custLat - MANDI_COORDS[0]) * 0.5, MANDI_COORDS[1] + (custLng - MANDI_COORDS[1]) * 0.5 - 0.001],
    [MANDI_COORDS[0] + (custLat - MANDI_COORDS[0]) * 0.75, MANDI_COORDS[1] + (custLng - MANDI_COORDS[1]) * 0.75 + 0.001],
    [custLat, custLng]
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up previous map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map centered between Mandi & Customer
    const centerLat = (MANDI_COORDS[0] + custLat) / 2;
    const centerLng = (MANDI_COORDS[1] + custLng) / 2;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 13,
      zoomControl: true,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Add MapTiler Streets v2 Tile Layer
    L.tileLayer(
      `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom: 19,
        crossOrigin: true
      }
    ).addTo(map);

    // Mandi Icon
    const mandiIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="
          background: #f59e0b;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.5);
          border: 3px solid #ffffff;
        ">
          🏪
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    // Customer Doorstep Icon
    const customerIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="
          background: #10b981;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.5);
          border: 3px solid #ffffff;
        ">
          🏠
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    // Rider Icon
    const riderIcon = L.divIcon({
      className: 'custom-rider-pin',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.4);
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            background: #059669;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 4px 16px rgba(5, 150, 105, 0.6);
            border: 2.5px solid #ffffff;
            position: relative;
            z-index: 2;
          ">
            🛵
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    // Add Mandi Pin
    L.marker(MANDI_COORDS, { icon: mandiIcon })
      .addTo(map)
      .bindPopup(`<b>Mandi Hub:</b> ${vendorName}<br/><span style="font-size: 0.8rem; color: #666;">APMC Muhana Mandi, Jaipur</span>`);

    // Add Customer Pin
    const customerMarker = L.marker([custLat, custLng], { icon: customerIcon })
      .addTo(map)
      .bindPopup(`<b>Your Doorstep:</b> ${customerName}<br/><span style="font-size: 0.8rem; color: #059669;">📍 ${custAddress}</span>`);

    customerMarkerRef.current = customerMarker;

    // Add Delivery Route Polyline
    const routeLine = L.polyline(routePoints, {
      color: '#10b981',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    routeLineRef.current = routeLine;

    // Initial Rider Position
    let initialPoint = routePoints[0];
    if (status === 'OUT_FOR_DELIVERY' || status === 'PICKED_UP') {
      initialPoint = routePoints[2];
    } else if (status === 'DELIVERED') {
      initialPoint = routePoints[routePoints.length - 1];
    }

    const riderMarker = L.marker(initialPoint, { icon: riderIcon })
      .addTo(map)
      .bindPopup('<b>🛵 Vikram Choudhary</b><br/><span style="font-size: 0.8rem; color: #059669;">Hero Electric EV (15 Mins Fast Delivery)</span>');

    riderMarkerRef.current = riderMarker;

    // Smooth Animation if on the road
    if (status === 'OUT_FOR_DELIVERY' || status === 'PICKED_UP') {
      let progress = 0.35;
      let direction = 1;

      const animateRider = () => {
        progress += 0.002 * direction;
        if (progress >= 0.9) direction = -0.5;
        if (progress <= 0.3) direction = 1;

        const totalSegments = routePoints.length - 1;
        const currentSegment = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
        const segmentProgress = (progress * totalSegments) - currentSegment;

        const p1 = routePoints[currentSegment];
        const p2 = routePoints[currentSegment + 1];

        const lat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
        const lng = p1[1] + (p2[1] - p1[1]) * segmentProgress;

        if (riderMarkerRef.current) {
          riderMarkerRef.current.setLatLng([lat, lng]);
        }

        animFrameRef.current = requestAnimationFrame(animateRider);
      };

      animFrameRef.current = requestAnimationFrame(animateRider);
    }

    // Fit bounds to show both Mandi and Customer
    const bounds = L.latLngBounds([MANDI_COORDS, [custLat, custLng]]);
    map.fitBounds(bounds, { padding: [40, 40] });

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [status, vendorName, customerName, custLat, custLng, custAddress]);

  const handleLocateMe = () => {
    setIsLocating(true);
    requestUserLocation(false);
    setTimeout(() => {
      setIsLocating(false);
      if (mapInstanceRef.current && userLocation?.lat) {
        mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 1.5 });
      }
    }, 1200);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
      {/* Map Container */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Floating MapTiler & GPS Live Badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.85)',
        color: '#ffffff',
        padding: '6px 12px',
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
        <span>MapTiler Live GPS • {userLocation?.isLiveGps ? 'Accurate Device GPS' : 'Jaipur Node'}</span>
      </div>

      {/* Floating "Locate My Live GPS Doorstep" Button */}
      <button
        onClick={handleLocateMe}
        disabled={isLocating}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 1000,
          background: userLocation?.isLiveGps ? 'var(--primary)' : 'rgba(15, 23, 42, 0.9)',
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
          transition: 'all 0.2s ease'
        }}
        title={lang === 'hi' ? 'सटीक जीपीएस लोकेशन की अनुमति दें' : 'Allow accurate device GPS location'}
      >
        <LocateFixed size={14} className={isLocating ? 'spin-animation' : ''} style={{ color: '#34d399' }} />
        <span>{isLocating ? 'Locating...' : (userLocation?.isLiveGps ? 'GPS Active' : '📍 Allow GPS')}</span>
      </button>
    </div>
  );
};
