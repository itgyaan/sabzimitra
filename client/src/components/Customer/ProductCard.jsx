import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Minus, Check, Star, ShieldCheck, Sparkles } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { lang, addToCart, cart, updateCartQty, t } = useApp();
  
  // Selected portion state: '250g', '500g', '1kg'
  const isBunchedOrPiece = product.unit === 'bunch' || product.unit === 'piece' || product.unit === 'box';
  
  const [selectedPortion, setSelectedPortion] = useState(
    isBunchedOrPiece ? `1 ${product.unit}` : '1 kg'
  );

  const getMultiplier = (portion) => {
    if (portion === '250 g' || portion === '250g') return 0.25;
    if (portion === '500 g' || portion === '500g') return 0.5;
    if (portion === '1 kg' || portion === '1kg') return 1.0;
    return 1.0;
  };

  const multiplier = getMultiplier(selectedPortion);
  const currentPrice = Math.round(product.pricePerKg * multiplier);
  const mandiPrice = Math.round(product.mandiRatePerKg * multiplier);
  const itemKey = `${product.id}-${selectedPortion}`;
  
  const cartItem = cart.find(item => item.itemKey === itemKey);
  const cartQty = cartItem ? cartItem.qty : 0;

  const handlePortionSelect = (p) => {
    setSelectedPortion(p);
  };

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Product Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', background: '#f1f5f9' }}>
        <img
          src={product.image}
          alt={lang === 'hi' ? product.nameHi : product.nameEn}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          loading="lazy"
        />

        {/* Freshness & Organic Badges */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <span className="badge-tag badge-green" style={{ backdropFilter: 'blur(8px)', background: 'rgba(236, 253, 245, 0.92)' }}>
            <Sparkles size={11} />
            <span>{product.freshness}</span>
          </span>
          {product.organic && (
            <span className="badge-tag badge-gold" style={{ backdropFilter: 'blur(8px)' }}>
              100% Organic
            </span>
          )}
        </div>

        {/* Rating chip */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.65)',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(4px)'
        }}>
          <Star size={11} fill="#fbbf24" color="#fbbf24" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Product Details */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            lineHeight: 1.3
          }}>
            {lang === 'hi' ? product.nameHi : product.nameEn}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {product.origin}
          </p>
        </div>

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          lineHeight: 1.4,
          marginBottom: '12px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.description}
        </p>

        {/* Portion Selector */}
        {!isBunchedOrPiece ? (
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
            {['250 g', '500 g', '1 kg'].map(p => (
              <button
                key={p}
                onClick={() => handlePortionSelect(p)}
                style={{
                  flex: 1,
                  padding: '5px 0',
                  borderRadius: '8px',
                  border: selectedPortion === p ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                  background: selectedPortion === p ? 'var(--primary-light)' : 'transparent',
                  color: selectedPortion === p ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: selectedPortion === p ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ marginBottom: '14px' }}>
            <span className="badge-tag" style={{ background: 'var(--bg-card-subtle)', color: 'var(--text-muted)' }}>
              Standard Pack: 1 {product.unit}
            </span>
          </div>
        )}

        {/* Pricing & Add to Cart */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                ₹{currentPrice}
              </span>
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--text-dim)',
                textDecoration: 'line-through'
              }}>
                ₹{mandiPrice}
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>
              {Math.round(((mandiPrice - currentPrice) / mandiPrice) * 100)}% Cheaper than Market
            </span>
          </div>

          {/* Add / Stepper Button */}
          {cartQty === 0 ? (
            <button
              onClick={() => addToCart(product, selectedPortion, multiplier)}
              className="btn-primary"
              style={{
                padding: '8px 14px',
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <Plus size={15} />
              <span>{t.addToCart}</span>
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
              padding: '4px 8px',
              gap: '10px'
            }}>
              <button
                onClick={() => updateCartQty(itemKey, -1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Minus size={14} />
              </button>
              <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{cartQty}</span>
              <button
                onClick={() => updateCartQty(itemKey, 1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
