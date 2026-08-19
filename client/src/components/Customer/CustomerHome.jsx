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
  Filter,
  Layers,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export const CustomerHome = () => {
  const { products, lang, t, setIsSubscriptionOpen, applyCouponCode } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const categories = [
    { id: 'all', nameEn: 'All Vegetables', nameHi: 'सभी सब्जियां', icon: Sparkles },
    { id: 'essentials', nameEn: 'Daily Essentials', nameHi: 'दैनिक आवश्यकताएं', icon: Flame },
    { id: 'leafy', nameEn: 'Leafy Greens', nameHi: 'हरी पत्तेदार सब्जियां', icon: Leaf },
    { id: 'exotic', nameEn: 'Exotics & Salads', nameHi: 'विदेशी व सलाद', icon: Salad },
    { id: 'organic', nameEn: '100% Organic', nameHi: 'जैविक व शुद्ध', icon: CheckCircle2 },
    { id: 'combos', nameEn: 'Sabzi Baskets', nameHi: 'सब्जी बॉस्केट', icon: ShoppingBag }
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
    // Simulated speech detection demo for Indian vegetables
    const samplePhrases = ['टमाटर', 'पालक', 'आलू', 'Broccoli', 'Organic Basket'];
    const chosen = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
    
    setTimeout(() => {
      setSearchQuery(chosen);
      setIsListening(false);
    }, 1200);
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Promotion Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%)',
        color: '#ffffff',
        borderRadius: '24px',
        padding: '36px 32px',
        margin: '24px 0 32px 0',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(5, 150, 105, 0.4)'
      }}>
        {/* Decorative background circles */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '16px'
          }}>
            <Clock size={14} style={{ color: '#34d399' }} />
            <span>{lang === 'hi' ? '⚡ 15-मिनट मंडी से सीधी डिलीवरी' : '⚡ 15-Min Farm Direct Delivery'}</span>
          </div>

          <h1 style={{
            fontSize: '2.3rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            {lang === 'hi'
              ? 'ताज़ा सब्जियां, मंडी के उचित भाव पर।'
              : 'Farm-Fresh Vegetables at Fair Mandi Prices.'}
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.88)',
            lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            {lang === 'hi'
              ? 'रोजाना सुबह 5 बजे छंटी हुई ताज़ा सब्जियां, ओज़ोन वॉश की गई और बिना किसी मिलावट के सीधे आपके द्वार पर।'
              : 'Sorted daily at 5 AM from local mandis. Ozone washed, zero pesticide residue, delivered to your doorstep in minutes.'}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => applyCouponCode('FRESH50')}
              style={{
                background: '#ffffff',
                color: '#065f46',
                border: 'none',
                padding: '12px 22px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{lang === 'hi' ? 'कूपन FRESH50 लगाएं (₹50 OFF)' : 'Apply FRESH50 (₹50 OFF)'}</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setIsSubscriptionOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '12px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ShoppingBag size={16} />
              <span>{t.weeklyBox}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        margin: '0 0 24px 0',
        flexWrap: 'wrap'
      }}>
        {/* Search input with Voice button */}
        <div style={{
          flex: 1,
          minWidth: '280px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '16px', 
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
              padding: '14px 50px 14px 44px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              fontSize: '0.92rem',
              outline: 'none',
              boxShadow: 'var(--shadow-sm)',
              transition: 'border-color 0.2s ease'
            }}
          />
          <button
            onClick={handleVoiceSearch}
            style={{
              position: 'absolute',
              right: '8px',
              width: '36px',
              height: '36px',
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
            title="Voice Search (AI Speech Recognition)"
          >
            <Mic size={17} className={isListening ? 'pulse-animation' : ''} />
          </button>
        </div>

        {/* 100% Organic Toggle Pill */}
        <button
          onClick={() => setOrganicOnly(!organicOnly)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 18px',
            borderRadius: 'var(--radius-full)',
            border: organicOnly ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
            background: organicOnly ? 'var(--primary-light)' : 'var(--bg-card)',
            color: organicOnly ? 'var(--primary)' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Leaf size={16} />
          <span>{lang === 'hi' ? 'केवल 100% ऑर्गेनिक' : 'Organic Only'}</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '28px'
      }}>
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
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                background: isSelected ? 'var(--primary)' : 'var(--bg-card)',
                color: isSelected ? '#ffffff' : 'var(--text-main)',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? '0 4px 14px rgba(5, 150, 105, 0.25)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} style={{ color: isSelected ? '#ffffff' : 'var(--primary)' }} />
              <span>{lang === 'hi' ? cat.nameHi : cat.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Fresh Produce Grid Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {selectedCategory === 'all' 
              ? (lang === 'hi' ? 'ताज़ा मंडी की सब्जियां' : 'Fresh Mandi Produce')
              : categories.find(c => c.id === selectedCategory)?.[lang === 'hi' ? 'nameHi' : 'nameEn']}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {lang === 'hi' ? `${filteredProducts.length} प्रकार की ताज़ा सब्जियां उपलब्ध` : `Showing ${filteredProducts.length} fresh produce items`}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)'
        }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {lang === 'hi' ? 'कोई सब्जी नहीं मिली' : 'No vegetables found matching your filter'}
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setOrganicOnly(false); }}
            className="btn-secondary"
            style={{ marginTop: '16px' }}
          >
            {lang === 'hi' ? 'फ़िल्टर हटाएं' : 'Clear Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
