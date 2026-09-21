import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Marquee3D() {
  const items = [
    "PURE BOTANICAL RADIANCE",
    "100% HALAL & ORGANIC",
    "DERMATOLOGIST FORMULATED",
    "BIO-ACTIVE CERAMIDES",
    "7-DAY VISIBLE GLOW GUARANTEE",
    "24K GOLD CELLULAR REJUVENATION",
    "NATIONWIDE EXPRESS COD DELIVERY"
  ];

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '24px 0',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        margin: '20px 0'
      }}
    >
      <div
        style={{
          transform: 'rotateZ(-1.5deg) rotateX(12deg) scale(1.04)',
          backgroundColor: '#121212',
          color: '#FFFFFF',
          padding: '16px 0',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          whiteSpace: 'nowrap',
          borderTop: '1px solid rgba(226, 130, 159, 0.4)',
          borderBottom: '1px solid rgba(226, 130, 159, 0.4)'
        }}
      >
        <div className="marquee-content" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {[...items, ...items, ...items].map((text, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              <Sparkles style={{ width: '14px', height: '14px', color: '#E2829F' }} />
              <span className="glow-hover-text">{text}</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          animation: marqueeScroll 28s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
