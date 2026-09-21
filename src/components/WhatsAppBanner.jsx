import React from 'react';
import { MessageCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/products';

export default function WhatsAppBanner() {
  return (
    <section style={{ padding: '60px 0', backgroundColor: 'var(--bg-base)' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #121212 0%, #201D1B 100%)',
            borderRadius: '28px',
            padding: ' clamp(28px, 6vw, 56px)',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-luxury)'
          }}
        >
          {/* Subtle floral background glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(226, 130, 159, 0.25) 0%, rgba(18, 18, 18, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '32px',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)', padding: '5px 14px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#FCD8E3', marginBottom: '14px' }}>
                <MessageCircle style={{ width: '13px', height: '13px', color: '#25D366' }} />
                AYAANA’S PERSONAL SKINCARE CONCIERGE
              </div>

              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', color: '#FFFFFF', marginBottom: '12px' }}>
                Need Help Choosing the <br />
                <span style={{ color: '#E2829F', fontStyle: 'italic' }}>Perfect Routine for Your Skin?</span>
              </h2>

              <p style={{ color: '#D4CDC5', fontSize: '14.5px', lineHeight: 1.5, maxWidth: '480px', marginBottom: '20px' }}>
                Message our aesthetician team directly on WhatsApp. Share your skin type or concerns (pigmentation, dry patches, acne scars) and receive an honest, personalized daily routine.
              </p>

              {/* Guarantees */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#A89F95' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock style={{ width: '14px', height: '14px', color: '#25D366' }} />
                  Avg. Response: &lt;15 mins
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck style={{ width: '14px', height: '14px', color: '#25D366' }} />
                  100% Confidential
                </span>
              </div>
            </div>

            {/* Right Action Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '20px', width: '100%', maxWidth: '380px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <img src="/assets/logo.png" alt="Ayaana's" style={{ width: '42px', height: '42px', borderRadius: '50%' }} />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>Syeda Ayaana</h4>
                    <span style={{ fontSize: '11px', color: '#25D366', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block' }}></span>
                      Online • Ready to Assist
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent("Hello Ayaana! I would like a personalized consultation for my skin type and product recommendation.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ width: '100%', textDecoration: 'none', boxSizing: 'border-box', padding: '14px' }}
                >
                  <MessageCircle style={{ width: '18px', height: '18px' }} />
                  <span>Start WhatsApp Chat Now</span>
                  <ArrowRight style={{ width: '15px', height: '15px', marginLeft: 'auto' }} />
                </a>

                <span style={{ fontSize: '11px', color: '#8A827A', textAlign: 'center', display: 'block', marginTop: '10px' }}>
                  Direct Number: {BRAND_CONFIG.whatsappDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
