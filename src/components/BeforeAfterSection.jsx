import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../data/products';
import { useShop } from '../context/ShopContext';
import ThreeProductViewer from './ThreeProductViewer';

export default function BeforeAfterSection() {
  const { transformationModel, products, formatPrice, setActiveProduct } = useShop();
  // Map modelType to a product name string that ThreeProductViewer can detect
  const MODEL_TYPE_NAMES = {
    'hand-feet-cream': 'Hand and Feet Whitening Cream',
    'face-whitening-cream': 'Face Whitening Cream',
    'toner': 'Herbal Whitening Radiance Toner'
  };
  const transModelProductName = MODEL_TYPE_NAMES[transformationModel?.modelType] || 'Hand and Feet Whitening Cream';
  const transLinkedProduct = transformationModel?.productId
    ? products.find(p => p.id === transformationModel.productId)
    : null;

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      if (clientX !== undefined) {
        updatePosition(clientX);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <section id="before-after" style={{ padding: '80px 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose-dark)', padding: '5px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '12px' }}>
            <Sparkles style={{ width: '13px', height: '13px' }} />
            VERIFIED PROOF & REAL RESULTS
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            See The Transformation: <br />
            <span style={{ color: '#C75678', fontStyle: 'italic' }}>7-Day Radiance Renewal</span>
          </h2>
          <p style={{ color: '#736C65', fontSize: '15px', marginTop: '12px' }}>
            Real customer results shared directly via WhatsApp. Zero photo editing, just pure botanical nourishment and cellular barrier repair.
          </p>
        </div>

        {/* Admin-selected 3D Product Model */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <div
            className="glass-panel"
            style={{
              borderRadius: '28px',
              padding: '24px',
              maxWidth: '440px',
              width: '100%',
              textAlign: 'center',
              boxShadow: 'var(--shadow-luxury)',
              border: '1px solid rgba(226, 130, 159, 0.2)'
            }}
          >
            <div style={{ height: '300px', width: '100%' }}>
              <ThreeProductViewer productName={transModelProductName} />
            </div>
            {transLinkedProduct && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#121212' }}>{transLinkedProduct.name}</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#C75678', marginTop: '4px' }}>
                  {formatPrice(transLinkedProduct.pricePKR, transLinkedProduct.priceUSD)}
                </div>
                <button
                  onClick={() => setActiveProduct(transLinkedProduct)}
                  className="btn-primary"
                  style={{ marginTop: '12px', padding: '9px 20px', fontSize: '13px' }}
                >
                  View Product
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}
        >
          {/* Left: Interactive Before & After Visual Slider */}
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-luxury)',
              backgroundColor: '#FFFFFF',
              aspectRatio: '1 / 1',
              maxHeight: '480px',
              margin: '0 auto',
              width: '100%',
              userSelect: 'none',
              cursor: 'ew-resize',
              touchAction: 'none'
            }}
            onMouseDown={(e) => {
              setIsDragging(true);
              updatePosition(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              if (e.touches[0]) updatePosition(e.touches[0].clientX);
            }}
          >
            {/* After Image (Right side underneath) */}
            <img
              src="/assets/customer-proof.jpg"
              alt="After - Radiant Skin"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Before Overlay with Clip Path */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              }}
            >
              <img
                src="/assets/customer-proof.jpg"
                alt="Before"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(60%) contrast(85%) brightness(88%)'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(18, 18, 18, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.04em'
                }}
              >
                Day 1 (Dull & Dry)
              </span>
            </div>

            {/* After Badge */}
            <span
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(226, 130, 159, 0.9)',
                backdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}
            >
              Day 7 (Luminous Radiance)
            </span>

            {/* Slider Dividing Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPosition}%`,
                width: '3px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
                transform: 'translateX(-50%)',
                pointerEvents: 'none'
              }}
            >
              {/* Slider Center Knob */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 900,
                  color: '#121212'
                }}
              >
                ⇄
              </div>
            </div>

            {/* Bottom Slider Helper Hint */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: '11px',
                color: '#121212',
                fontWeight: 600,
                pointerEvents: 'none'
              }}
            >
              Drag slider left or right
            </div>
          </div>

          {/* Right: Authentic WhatsApp Testimonial & Clinical Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Real WhatsApp Chat Bubble Box */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '20px',
                borderLeft: '4px solid #128C7E'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#128C7E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#121212' }}>
                    Verified WhatsApp Feedback
                  </h4>
                  <span style={{ fontSize: '11px', color: '#736C65' }}>Customer in Lahore • Received 4:46 PM</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8F4EE', padding: '14px 18px', borderRadius: '14px', fontStyle: 'italic', fontSize: '14px', color: '#2E2B28', lineHeight: 1.5, marginBottom: '12px' }}>
                “Se boht zyada bright howy n 😊 Mai apko before and after ke picture bi send krti hu abi 🤗 Hands aur face par itna natural glow aya hai, dark knuckles bilkul fade ho gaye!”
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#128C7E', fontWeight: 600 }}>
                <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                <span>Verified Purchase • Hand & Foot Complex + Skin Repair Cream</span>
              </div>
            </div>

            {/* Key Clinical Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#C75678', letterSpacing: '-0.02em' }}>
                  98%
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#121212', marginTop: '2px' }}>
                  Radiance Boost
                </div>
                <p style={{ fontSize: '11px', color: '#736C65', marginTop: '4px' }}>
                  Reported luminous glass skin finish after 1 week of consistent ritual.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#D6A685', letterSpacing: '-0.02em' }}>
                  100%
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#121212', marginTop: '2px' }}>
                  Gentle on Sensitive Skin
                </div>
                <p style={{ fontSize: '11px', color: '#736C65', marginTop: '4px' }}>
                  0% stinging, non-irritating botanical formula with certified organic extracts.
                </p>
              </div>
            </div>

            {/* Direct Consultation Link */}
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent("Hello Ayaana's! I saw the 7-day before and after results. Can you recommend the best combination for my skin concern?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ textDecoration: 'none', alignSelf: 'flex-start' }}
            >
              <MessageCircle style={{ width: '18px', height: '18px' }} />
              <span>Get Free WhatsApp Skin Consultation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
