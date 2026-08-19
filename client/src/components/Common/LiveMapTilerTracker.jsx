import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MAPTILER_KEY = 'MsX5E5sG2GFTtK8L6GRT';

// Jaipur Mandi & Malviya Nagar coordinates
const MANDI_COORDS = [26.8289, 75.8056]; // APMC Muhana Mandi, Jaipur
const CUSTOMER_COORDS = [26.8525, 75.8235]; // Malviya Nagar, Jaipur

// Route coordinates waypoint interpolation
const ROUTE_POINTS = [
  [26.8289, 75.8056],
  [26.8335, 75.8090],
  [26.8390, 75.8130],
  [26.8450, 75.8180],
  [26.8490, 75.8210],
  [26.8525, 75.8235]
];

export const LiveMapTilerTracker = ({ 
  status = 'OUT_FOR_DELIVERY',
  vendorName = 'Sharma Fresh Sabzi Bhandar',
  customerName = 'Pooja Verma',
  height = '280px'
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up previous map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map centered around Jaipur route
    const map = L.map(mapContainerRef.current, {
      center: [26.8407, 75.8145],
      zoom: 13.5,
      zoomControl: true,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Add MapTiler Streets v2 Tile Layer with Retina support
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

    // Custom Mandi Shop Marker Icon
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

    // Custom Customer Doorstep Marker Icon
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

    // Custom Live Rider Marker Icon with Pulsing Halo
    const riderIcon = L.divIcon({
      className: 'custom-rider-pin',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.35);
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
    L.marker(CUSTOMER_COORDS, { icon: customerIcon })
      .addTo(map)
      .bindPopup(`<b>Doorstep Drop:</b> ${customerName}<br/><span style="font-size: 0.8rem; color: #666;">Malviya Nagar, Jaipur</span>`);

    // Add Delivery Route Polyline
    L.polyline(ROUTE_POINTS, {
      color: '#10b981',
      weight: 5,
      opacity: 0.8,
      dashArray: '8, 8',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // Initial Rider Position Calculation
    let initialPoint = ROUTE_POINTS[0];
    if (status === 'OUT_FOR_DELIVERY' || status === 'PICKED_UP') {
      initialPoint = ROUTE_POINTS[2]; // Middle of route
    } else if (status === 'DELIVERED') {
      initialPoint = ROUTE_POINTS[ROUTE_POINTS.length - 1];
    }

    const riderMarker = L.marker(initialPoint, { icon: riderIcon })
      .addTo(map)
      .bindPopup('<b>🛵 Vikram Choudhary</b><br/><span style="font-size: 0.8rem; color: #059669;">Hero Electric EV (15 Mins Delivery)</span>');

    riderMarkerRef.current = riderMarker;

    // Smooth Live GPS Movement Animation when status is OUT_FOR_DELIVERY
    if (status === 'OUT_FOR_DELIVERY' || status === 'PICKED_UP') {
      let progress = 0.35;
      let direction = 1;

      const animateRider = () => {
        progress += 0.002 * direction;
        if (progress >= 0.85) direction = -0.6;
        if (progress <= 0.35) direction = 1;

        // Interpolate along route points
        const totalSegments = ROUTE_POINTS.length - 1;
        const currentSegment = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
        const segmentProgress = (progress * totalSegments) - currentSegment;

        const p1 = ROUTE_POINTS[currentSegment];
        const p2 = ROUTE_POINTS[currentSegment + 1];

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
    const bounds = L.latLngBounds([MANDI_COORDS, CUSTOMER_COORDS]);
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
  }, [status, vendorName, customerName]);

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
        <span>MapTiler Live GPS • 15 Mins Hyperlocal</span>
      </div>
    </div>
  );
};
