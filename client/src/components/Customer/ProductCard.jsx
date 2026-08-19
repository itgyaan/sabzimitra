import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Minus, Star, Sparkles } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { lang, addToCart, cart, updateCartQty, t } = useApp();
  
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
      position: 'relative',
      borderRadius: '16px'
    }}>
      {/* Product Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(120px, 28vw, 160px)',
        overflow: 'hidden',
        background: '#f1f5f9'
      }}>
        <img
          src={product.image}
          alt={lang === 'hi' ? product.nameHi : product.nameEn}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          loading="lazy"
        />

        {/* Freshness & Organic Badges */}
        <div style={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <span className="badge-tag badge-green" style={{ backdropFilter: 'blur(8px)', background: 'rgba(236, 253, 245, 0.94)', fontSize: '0.62rem' }}>
            <Sparkles size={9} />
            <span>{product.freshness}</span>
          </span>
          {product.organic && (
            <span className="badge-tag badge-gold" style={{ backdropFilter: 'blur(8px)', fontSize: '0.62rem' }}>
              Organic
            </span>
          )}
        </div>

        {/* Rating chip */}
        <div style={{
          position: 'absolute',
          bottom: '6px',
          right: '6px',
          background: 'rgba(0, 0, 0, 0.65)',
          color: '#fff',
          padding: '1px 6px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.68rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          backdropFilter: 'blur(4px)'
        }}>
          <Star size={10} fill="#fbbf24" color="#fbbf24" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Product Details */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '6px' }}>
          <h3 style={{
            fontSize: 'clamp(0.85rem, 2.8vw, 0.98rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {lang === 'hi' ? product.nameHi : product.nameEn}
          </h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.origin}
          </p>
        </div>

        {/* Portion Selector (Chips) */}
        {!isBunchedOrPiece ? (
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
            {['250g', '500g', '1kg'].map(p => {
              const fullLabel = p === '250g' ? '250 g' : p === '500g' ? '500 g' : '1 kg';
              const isSelected = selectedPortion === fullLabel || selectedPortion === p;
              return (
                <button
                  key={p}
                  onClick={() => handlePortionSelect(fullLabel)}
                  style={{
                    flex: 1,
                    padding: '3px 0',
                    borderRadius: '6px',
                    border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                    background: isSelected ? 'var(--primary-light)' : 'transparent',
                    color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                    fontSize: '0.68rem',
                    fontWeight: isSelected ? 800 : 500,
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ marginBottom: '8px' }}>
            <span className="badge-tag" style={{ background: 'var(--bg-card-subtle)', color: 'var(--text-muted)', fontSize: '0.65rem' }}>
              1 {product.unit}
            </span>
          </div>
        )}

        {/* Pricing & Add to Cart */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '6px',
          borderTop: '1px solid var(--border-subtle)',
          gap: '4px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: 'clamp(0.95rem, 3vw, 1.15rem)', fontWeight: 800, color: 'var(--primary)' }}>
                ₹{currentPrice}
              </span>
              <span style={{
                fontSize: '0.7rem',
                color: 'var(--text-dim)',
                textDecoration: 'line-through'
              }}>
                ₹{mandiPrice}
              </span>
            </div>
          </div>

          {/* Add / Stepper Button */}
          {cartQty === 0 ? (
            <button
              onClick={() => addToCart(product, selectedPortion, multiplier)}
              className="btn-primary"
              style={{
                padding: '5px 10px',
                fontSize: '0.74rem',
                borderRadius: 'var(--radius-full)',
                minHeight: '30px'
              }}
            >
              <Plus size={13} />
              <span>{lang === 'hi' ? 'जोड़ें' : 'Add'}</span>
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
              padding: '2px 6px',
              gap: '6px'
            }}>
              <button
                onClick={() => updateCartQty(itemKey, -1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
              >
                <Minus size={12} />
              </button>
              <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>{cartQty}</span>
              <button
                onClick={() => updateCartQty(itemKey, 1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
              >
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
