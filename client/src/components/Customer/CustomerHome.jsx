import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  Mic, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  Leaf, 
  ShoppingBag, 
  Salad, 
  ArrowRight
} from 'lucide-react';

export const CustomerHome = () => {
  const { products, lang, t, setIsSubscriptionOpen, applyCouponCode } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const categories = [
    { id: 'all', nameEn: 'All Veggies', nameHi: 'सभी सब्जियां', icon: Sparkles },
    { id: 'essentials', nameEn: 'Essentials', nameHi: 'दैनिक (Daily)', icon: Flame },
    { id: 'leafy', nameEn: 'Leafy', nameHi: 'हरी पत्तीदार', icon: Leaf },
    { id: 'exotic', nameEn: 'Exotics', nameHi: 'विदेशी व सलाद', icon: Salad },
    { id: 'organic', nameEn: 'Organic', nameHi: 'जैविक व शुद्ध', icon: CheckCircle2 },
    { id: 'combos', nameEn: 'Baskets', nameHi: 'सब्जी बॉस्केट', icon: ShoppingBag }
  ];

  // Filter produce
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesOrganic = !organicOnly || product.organic;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      product.nameEn.toLowerCase().includes(query) ||
      product.nameHi.includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.origin.toLowerCase().includes(query);

    return matchesCategory && matchesOrganic && matchesSearch;
  });

  const handleVoiceSearch = () => {
    setIsListening(true);
    const samplePhrases = ['टमाटर', 'पालक', 'आलू', 'Broccoli', 'Organic Basket'];
    const chosen = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
    
    setTimeout(() => {
      setSearchQuery(chosen);
      setIsListening(false);
    }, 1000);
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Responsive Hero Promotion Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%)',
        color: '#ffffff',
        borderRadius: '20px',
        padding: 'clamp(20px, 4vw, 32px)',
        margin: '16px 0 20px 0',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 30px -10px rgba(5, 150, 105, 0.4)'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '12px'
          }}>
            <Clock size={13} style={{ color: '#34d399' }} />
            <span>{lang === 'hi' ? '⚡ 15-मिनट मंडी से सीधी डिलीवरी' : '⚡ 15-Min Farm Direct Delivery'}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.35rem, 4.5vw, 2.2rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: '8px',
            letterSpacing: '-0.02em'
          }}>
            {lang === 'hi'
              ? 'ताज़ा सब्जियां, मंडी के उचित भाव पर।'
              : 'Farm-Fresh Veggies at Mandi Rates.'}
          </h1>

          <p style={{
            fontSize: 'clamp(0.82rem, 2.5vw, 0.95rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.5,
            marginBottom: '16px',
            maxWidth: '600px'
          }}>
            {lang === 'hi'
              ? 'रोजाना सुबह छंटी हुई ताज़ा सब्जियां, ओज़ोन वॉश की गई और सीधे आपके द्वार पर।'
              : 'Sorted daily at 5 AM from local mandis. Ozone washed, delivered to your doorstep in 15 minutes.'}
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => applyCouponCode('FRESH50')}
              style={{
                background: '#ffffff',
                color: '#065f46',
                border: 'none',
                padding: '9px 16px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.84rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{lang === 'hi' ? 'कूपन FRESH50 (₹50 छूट)' : 'Apply FRESH50 (₹50 OFF)'}</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => setIsSubscriptionOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '9px 14px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShoppingBag size={14} />
              <span>{t.weeklyBox}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 0 16px 0',
        flexWrap: 'wrap'
      }}>
        {/* Search input with Voice button */}
        <div style={{
          flex: 1,
          minWidth: '200px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '14px', 
              color: 'var(--text-muted)' 
            }} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{
              width: '100%',
              padding: '11px 44px 11px 38px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              fontSize: '0.86rem',
              outline: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
          <button
            onClick={handleVoiceSearch}
            style={{
              position: 'absolute',
              right: '6px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              background: isListening ? '#ef4444' : 'var(--primary-light)',
              color: isListening ? '#ffffff' : 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Voice Search"
          >
            <Mic size={15} className={isListening ? 'pulse-animation' : ''} />
          </button>
        </div>

        {/* 100% Organic Toggle Pill */}
        <button
          onClick={() => setOrganicOnly(!organicOnly)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '9px 12px',
            borderRadius: 'var(--radius-full)',
            border: organicOnly ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
            background: organicOnly ? 'var(--primary-light)' : 'var(--bg-card)',
            color: organicOnly ? 'var(--primary)' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.78rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            whiteSpace: 'nowrap'
          }}
        >
          <Leaf size={14} />
          <span>{lang === 'hi' ? 'ऑर्गेनिक' : 'Organic'}</span>
        </button>
      </div>

      {/* Category Pills Bar (Touch Friendly Scroll) */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '16px'
        }}
        className="no-scrollbar"
      >
        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                background: isSelected ? 'var(--primary)' : 'var(--bg-card)',
                color: isSelected ? '#ffffff' : 'var(--text-main)',
                fontWeight: isSelected ? 800 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? '0 3px 10px rgba(5, 150, 105, 0.25)' : 'var(--shadow-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={14} style={{ color: isSelected ? '#ffffff' : 'var(--primary)', flexShrink: 0 }} />
              <span>{lang === 'hi' ? cat.nameHi : cat.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Produce Grid Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {selectedCategory === 'all' 
              ? (lang === 'hi' ? 'ताज़ा मंडी की सब्जियां' : 'Fresh Mandi Produce')
              : categories.find(c => c.id === selectedCategory)?.[lang === 'hi' ? 'nameHi' : 'nameEn']}
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {lang === 'hi' ? `${filteredProducts.length} प्रकार की सब्जियां` : `${filteredProducts.length} items available`}
          </p>
        </div>
      </div>

      {/* Responsive Products Grid (2 columns on mobile / Android, 3-4 columns on desktop) */}
      {filteredProducts.length > 0 ? (
        <div 
          className="products-grid-responsive"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 16px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {lang === 'hi' ? 'कोई सब्जी नहीं मिली' : 'No vegetables found'}
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setOrganicOnly(false); }}
            className="btn-secondary"
            style={{ marginTop: '12px' }}
          >
            {lang === 'hi' ? 'फ़िल्टर हटाएं' : 'Clear Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
