import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import ThreeHeroJar from './ThreeHeroJar';
import Tilt3DCard from './Tilt3DCard';
import { ArrowUpRight, Sparkles, MessageCircle, Droplets } from 'lucide-react';
import { BRAND_CONFIG } from '../data/products';

export default function HeroSection({ onShopNowClick }) {
  const { formatPrice, setActiveProduct, products } = useShop();
  const heroProduct = products.find((p) => p.isHero) || products[0];

  // Active Hotspot tooltip state
  const [activeSpot, setActiveSpot] = useState(null);

  const hotspots = [
    {
      id: 'forehead',
      title: 'Dewy Glass Sheen',
      desc: 'Infused with pure bio-active ceramides & rose water for light-reflecting radiance.',
      top: '30%',
      left: '55%'
    },
    {
      id: 'temple',
      title: 'Smooth Cellular Barrier',
      desc: 'Clinically repairs microscopic dryness & environmental oxidative damage.',
      top: '36%',
      left: '68%'
    }
  ];

  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '28px', paddingBottom: '50px' }}>
      {/* Dynamic 3D Background Glow Spheres */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(226, 130, 159, 0.22) 0%, rgba(253, 251, 247, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
        className="animate-float"
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0%',
          left: '2%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 166, 133, 0.18) 0%, rgba(253, 251, 247, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top 3D Floating Mini Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '18px' }}>
          <span
            className="glow-hover-text"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #F9E7EC 0%, #F7EFE9 100%)',
              color: 'var(--brand-rose-dark)',
              padding: '7px 18px',
              borderRadius: '9999px',
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              boxShadow: '0 4px 14px rgba(226, 130, 159, 0.2)',
              border: '1px solid rgba(226, 130, 159, 0.3)'
            }}
          >
            <Sparkles style={{ width: '13px', height: '13px', color: '#C75678' }} />
            IMMERSIVE 3D BOTANICAL RADIANCE • 100% HALAL
          </span>
        </div>

        {/* Editorial 3D Split Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '28px',
            alignItems: 'stretch'
          }}
          className="hero-grid"
        >
          {/* Card 1: 3D Editorial Model with Fluted Glass & Hotspots */}
          <Tilt3DCard
            maxTilt={10}
            scale={1.01}
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              minHeight: 'clamp(380px, 50vw, 540px)',
              boxShadow: 'var(--shadow-luxury)',
              backgroundColor: '#EDE5DC'
            }}
          >
            <img
              src="/assets/hero_model.jpg"
              alt="Ayaana's Radiant Skincare Editorial"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                position: 'absolute',
                inset: 0
              }}
            />
            {/* Elegant Luxury Vignette for text contrast & mood */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(14, 14, 18, 0.45) 0%, rgba(14, 14, 18, 0.05) 38%, rgba(14, 14, 18, 0.15) 60%, rgba(14, 14, 18, 0.78) 100%)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Fluted Glass Accent Bar */}
            <div
              className="fluted-glass-effect"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 'clamp(44px, 10vw, 80px)',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(18px, 3vw, 28px) 8px'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFFFFF', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                AYAANA’S
              </span>
              <div style={{ width: '1px', height: '60px', background: 'rgba(255, 255, 255, 0.4)', margin: 'auto' }} />
              <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.9)', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em' }}>
                PURE 3D RADIANCE
              </span>
            </div>

            {/* Kinetic 3D Headline Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '28px',
                left: 'clamp(58px, 14vw, 100px)',
                right: '20px',
                zIndex: 2,
                color: '#FFFFFF',
                textShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
              }}
            >
              <h2
                className="glow-hover-text"
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 38px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.05,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em'
                }}
              >
                Reveal Your <br />
                <span style={{ color: '#FCD8E3', fontStyle: 'italic', textShadow: '0 0 25px rgba(226, 130, 159, 0.9)' }}>
                  Glow ✦
                </span>
              </h2>
              <p style={{ fontSize: '13px', opacity: 0.95, marginTop: '10px', maxWidth: '240px', lineHeight: 1.45 }}>
                Hydrate, restore, and illuminate your skin with active bio-botanicals.
              </p>
            </div>

            {/* Floating 3D Micro-Badge on Model */}
            <div
              className="floating-badge-1"
              style={{
                position: 'absolute',
                bottom: '80px',
                left: 'clamp(58px, 14vw, 100px)',
                zIndex: 3,
                background: 'rgba(18, 18, 18, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '6px 14px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Droplets style={{ width: '13px', height: '13px', color: '#E2829F' }} />
              <span>72-Hour Cellular Hydration</span>
            </div>

            {/* Interactive Radiance Hotspots */}
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{
                  position: 'absolute',
                  top: spot.top,
                  left: spot.left,
                  zIndex: 4,
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setActiveSpot(spot.id)}
                onMouseLeave={() => setActiveSpot(null)}
                onClick={() => setActiveSpot(activeSpot === spot.id ? null : spot.id)}
              >
                <div
                  className="radiance-spot"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '3.5px solid #E2829F',
                    boxShadow: '0 0 15px rgba(226, 130, 159, 0.9)'
                  }}
                />

                {/* Hotspot Tooltip */}
                {activeSpot === spot.id && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '26px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '220px',
                      padding: '14px',
                      borderRadius: '14px',
                      background: 'rgba(18, 18, 18, 0.92)',
                      backdropFilter: 'blur(16px)',
                      color: '#FFFFFF',
                      fontSize: '11.5px',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                      pointerEvents: 'none',
                      zIndex: 10,
                      border: '1px solid rgba(226, 130, 159, 0.3)'
                    }}
                  >
                    <p style={{ fontWeight: 800, color: '#FCD8E3', marginBottom: '4px' }}>
                      {spot.title}
                    </p>
                    <p style={{ opacity: 0.9, lineHeight: 1.4 }}>
                      {spot.desc}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Corner Quick Arrow */}
            <button
              onClick={() => setActiveProduct(heroProduct)}
              style={{
                position: 'absolute',
                bottom: '22px',
                right: '22px',
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
                transition: 'var(--transition-smooth)',
                zIndex: 4,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
              }}
              title="View Featured Product"
            >
              <ArrowUpRight style={{ width: '22px', height: '22px' }} />
            </button>
          </Tilt3DCard>

          {/* Card 2: Interactive 3D Skincare Jar Stage with Floating 3D Badges */}
          <Tilt3DCard
            maxTilt={8}
            scale={1.01}
            style={{
              position: 'relative',
              borderRadius: '28px',
              padding: 'clamp(18px, 4vw, 36px)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-luxury)',
              overflow: 'hidden'
            }}
          >
            {/* Header: Pure Skin Glow -> Radiance with 3D text */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#736C65' }}>
                  Signature 3D Formulation
                </span>
                <span style={{ background: '#121212', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, padding: '5px 12px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                  50ml
                </span>
              </div>

              <div style={{ marginTop: '14px' }}>
                <h1
                  className="glow-hover-text"
                  style={{
                    fontSize: 'clamp(32px, 4.5vw, 46px)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em'
                  }}
                >
                  Pure Skin <br />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#121212' }}>
                    Glow <span style={{ color: '#E2829F', fontSize: '0.85em' }}>→</span> <span style={{ color: '#C75678', fontStyle: 'italic', textShadow: '0 0 20px rgba(226, 130, 159, 0.4)' }}>Radiance</span>
                  </span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px', maxWidth: '360px', lineHeight: 1.5 }}>
                  Dermatologist formulated with bio-active ceramides, pure organic roses, and clinically proven botanical brighteners.
                </p>
              </div>
            </div>

            {/* 3D Interactive Three.js Skincare Jar Canvas */}
            <div style={{ position: 'relative', width: '100%', margin: '4px 0', zIndex: 1 }}>
              <ThreeHeroJar />

              {/* Floating 3D Ingredient Badges Around 3D Jar */}
              <div
                className="floating-badge-1"
                style={{
                  position: 'absolute',
                  top: '12%',
                  right: '4%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(12px)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#C75678',
                  boxShadow: '0 6px 18px rgba(226, 130, 159, 0.25)',
                  border: '1px solid rgba(226, 130, 159, 0.3)',
                  pointerEvents: 'none'
                }}
              >
                ✦ 5% Niacinamide Active
              </div>

              <div
                className="floating-badge-2"
                style={{
                  position: 'absolute',
                  bottom: '18%',
                  left: '4%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(12px)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#121212',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                  border: '1px solid var(--border-card)',
                  pointerEvents: 'none'
                }}
              >
                ✦ Bio-Ceramide NP Shield
              </div>
            </div>

            {/* Bottom Actions & Price */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#121212' }}>
                  {formatPrice(heroProduct.pricePKR, heroProduct.priceUSD)}
                </span>
                <span style={{ fontSize: '15px', color: '#9B948C', textDecoration: 'line-through' }}>
                  {formatPrice(heroProduct.originalPricePKR, heroProduct.originalPriceUSD)}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#C75678', background: 'var(--brand-rose-light)', padding: '3px 10px', borderRadius: '6px' }}>
                  SAVE 16%
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }} className="hero-cta-group">
                <button
                  onClick={() => onShopNowClick()}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '150px' }}
                >
                  <span>Explore Collection</span>
                  <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                </button>

                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent("Hello Ayaana's! I am interested in your Radiance Skin Repair Cream. Please provide more details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ textDecoration: 'none' }}
                >
                  <MessageCircle style={{ width: '16px', height: '16px' }} />
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </div>
          </Tilt3DCard>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr 1.18fr !important;
          }
        }
        @media (max-width: 480px) {
          .hero-cta-group {
            flex-direction: column !important;
          }
          .hero-cta-group button,
          .hero-cta-group a {
            width: 100% !important;
            min-width: 100% !important;
            box-sizing: border-box !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
