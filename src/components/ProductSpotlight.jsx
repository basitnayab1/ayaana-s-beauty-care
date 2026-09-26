import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import ThreeProductViewer from './ThreeProductViewer';
import { Sparkles, ShoppingBag, MessageCircle, Star } from 'lucide-react';

export default function ProductSpotlight() {
  const { products, addToCart, setActiveProduct, formatPrice, generateSingleProductWhatsAppUrl } = useShop();
  const heroProduct = products.find((p) => p.isHero) || products[0];

  const [activeTab, setActiveTab] = useState('ceramides');

  const ingredients = [
    {
      id: 'ceramides',
      name: 'Bio-Ceramides (NP)',
      role: 'Lipid Shield & Deep Moisture Lock',
      desc: 'Restores the intercellular lipid matrix to prevent transepidermal water loss and repair rough, parched skin barriers.'
    },
    {
      id: 'niacinamide',
      name: 'Niacinamide (5%)',
      role: 'Tone Balance & Pore Refinement',
      desc: 'Clinically proven gold standard for smoothing texture, fading dark spots, and minimizing enlarged pores.'
    },
    {
      id: 'rose',
      name: 'Rosa Damascena',
      role: 'Pure Botanical Hydrosol',
      desc: 'Steam-distilled organic rose extract that calms sensitivity, reduces redness, and imparts an authentic petal-soft feel.'
    },
    {
      id: 'arbutin',
      name: 'Alpha-Arbutin',
      role: 'Melanin Harmonizer',
      desc: 'Naturally derived brightening bio-active that inhibits tyrosinase activity to reverse sun-damage and dark patches safely.'
    }
  ];

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-base)', borderBottom: '1px solid rgba(18, 18, 18, 0.05)' }}>
      <div className="container">
        {/* Spotlight Card Wrapper */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '32px',
            border: '1px solid var(--border-card)',
            padding: 'clamp(20px, 4vw, 50px)',
            boxShadow: 'var(--shadow-luxury)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            {/* Left: 3D Interactive Jar Inspector */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', padding: '6px 14px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#C75678', marginBottom: '14px', boxShadow: 'var(--shadow-sm)' }}>
                <Sparkles style={{ width: '13px', height: '13px' }} />
                INTERACTIVE 3D PRODUCT INSPECTOR
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '20px',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative'
                }}
              >
                <ThreeProductViewer productName={heroProduct.name} />
              </div>
            </div>

            {/* Right: Formulation Science & Benefits */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D6A685', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: '15px', height: '15px', fill: '#D6A685' }} />
                ))}
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#121212', marginLeft: '6px' }}>
                  4.9 / 5.0 (1,420+ Verified Reviews)
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '12px' }}>
                {heroProduct.name}
              </h2>

              <p style={{ color: '#736C65', fontSize: '14.5px', lineHeight: 1.5, marginBottom: '24px' }}>
                {heroProduct.description}
              </p>

              {/* Interactive Ingredient Pills */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#121212', display: 'block', marginBottom: '10px' }}>
                  Explore Clinical Actives:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {ingredients.map((ing) => (
                    <button
                      key={ing.id}
                      onClick={() => setActiveTab(ing.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: '1px solid',
                        transition: 'all 0.2s',
                        backgroundColor: activeTab === ing.id ? '#121212' : '#FFFFFF',
                        color: activeTab === ing.id ? '#FFFFFF' : '#2E2B28',
                        borderColor: activeTab === ing.id ? '#121212' : 'rgba(18, 18, 18, 0.1)'
                      }}
                    >
                      {ing.name}
                    </button>
                  ))}
                </div>

                {/* Selected Ingredient Highlight Box */}
                {(() => {
                  const curr = ingredients.find((i) => i.id === activeTab);
                  return (
                    <div style={{ marginTop: '14px', background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid var(--border-card)' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#C75678', marginBottom: '4px' }}>
                        {curr.role}
                      </div>
                      <div style={{ fontSize: '13px', color: '#736C65', lineHeight: 1.45 }}>
                        {curr.desc}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Price & CTAs */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#121212' }}>
                  {formatPrice(heroProduct.pricePKR, heroProduct.priceUSD)}
                </span>
                <span style={{ fontSize: '16px', color: '#9B948C', textDecoration: 'line-through' }}>
                  {formatPrice(heroProduct.originalPricePKR, heroProduct.originalPriceUSD)}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#C75678', background: 'var(--brand-rose-light)', padding: '3px 8px', borderRadius: '4px' }}>
                  FREE NATIONWIDE DELIVERY
                </span>
              </div>

              <div className="spotlight-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button
                  onClick={() => addToCart(heroProduct, 1)}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '160px' }}
                >
                  <ShoppingBag style={{ width: '16px', height: '16px' }} />
                  <span>Add to Luxury Bag</span>
                </button>

                <a
                  href={generateSingleProductWhatsAppUrl(heroProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ textDecoration: 'none' }}
                >
                  <MessageCircle style={{ width: '16px', height: '16px' }} />
                  <span>WhatsApp 1-Click Buy</span>
                </a>

                <button
                  onClick={() => setActiveProduct(heroProduct)}
                  className="btn-secondary"
                >
                  Full Details & Ritual
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .spotlight-actions {
            flex-direction: column !important;
          }
          .spotlight-actions button,
          .spotlight-actions a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
