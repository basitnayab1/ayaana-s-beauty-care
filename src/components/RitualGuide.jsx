import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function RitualGuide() {
  const { setActiveProduct, products } = useShop();

  const steps = [
    {
      number: "01",
      title: "Purify & Balance",
      subtitle: "Rose Damascena Clarifying Wash",
      desc: "Wash away impurities without stripping vital lipids. Prepares the dermal stratum for deeper nutrient absorption.",
      time: "Morning & Night",
      productId: "rose-damascena-clarifying-cleanser",
      image: "/assets/radiance_toner.jpg"
    },
    {
      number: "02",
      title: "Tone & Brighten",
      subtitle: "Herbal Whitening Radiance Toner",
      desc: "Micro-droplets of pure distilled rose hydrosol and 5% niacinamide restore optimal pH and tighten pores.",
      time: "Morning & Night",
      productId: "herbal-whitening-radiance-toner",
      image: "/assets/radiance_toner.jpg"
    },
    {
      number: "03",
      title: "Rejuvenate & Seal",
      subtitle: "24K Gold Elixir & Skin Repair Cream",
      desc: "Press 3 drops of 24K gold serum, then massage the velvet repair cream to lock in 72-hour luminous glass skin.",
      time: "Twice Daily",
      productId: "radiance-skin-repair-cream",
      image: "/assets/hero_cream.jpg"
    }
  ];

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose-dark)', padding: '5px 14px', borderRadius: '9999px', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '12px' }}>
            <Sparkles style={{ width: '13px', height: '13px' }} />
            THE DAILY RADIANCE RITUAL
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            3 Steps to Flawless, <br />
            <span style={{ color: '#C75678', fontStyle: 'italic' }}>Luminous Glass Skin</span>
          </h2>
          <p style={{ color: '#736C65', fontSize: '15px', marginTop: '12px' }}>
            A synergistic sequence designed to layer bio-active botanicals for maximum clinical repair and long-lasting glow.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '24px' }}>
          {steps.map((step, idx) => {
            const prod = products.find((p) => p.id === step.productId);
            return (
              <div
                key={idx}
                className="card-3d"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <span style={{ fontSize: '36px', fontWeight: 900, color: 'rgba(226, 130, 159, 0.35)', lineHeight: 1 }}>
                      {step.number}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#736C65', background: 'var(--bg-surface)', padding: '4px 10px', borderRadius: '9999px' }}>
                      {step.time}
                    </span>
                  </div>

                  <div style={{ width: '100%', height: '180px', borderRadius: '14px', overflow: 'hidden', marginBottom: '18px', backgroundColor: 'var(--bg-surface)' }}>
                    <img
                      src={step.image}
                      alt={step.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#121212', marginBottom: '4px' }}>
                    {step.title}
                  </h3>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#C75678', marginBottom: '10px' }}>
                    {step.subtitle}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#736C65', lineHeight: 1.45, marginBottom: '20px' }}>
                    {step.desc}
                  </p>
                </div>

                {prod && (
                  <button
                    onClick={() => setActiveProduct(prod)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      borderTop: '1px solid rgba(18, 18, 18, 0.06)',
                      paddingTop: '14px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#121212'
                    }}
                  >
                    <span>View Step Product</span>
                    <ArrowRight style={{ width: '16px', height: '16px', color: '#C75678' }} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
