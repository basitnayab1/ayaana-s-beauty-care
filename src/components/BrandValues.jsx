import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';

export default function BrandValues() {
  const values = [
    {
      icon: Sparkles,
      title: "100% Halal & Pure Botanicals",
      description: "Cruelty-free, alcohol-free, and ethically crafted with certified organic floral extracts."
    },
    {
      icon: ShieldCheck,
      title: "Dermatologist Formulated",
      description: "Clinically validated actives calibrated for delicate, sensitive, and hyperpigmentation-prone skin."
    },
    {
      icon: HeartHandshake,
      title: "Guaranteed Visible Radiance",
      description: "Noticeable improvement in skin tone, hydration, and luminous glow within 7 to 10 days."
    },
    {
      icon: Truck,
      title: "Nationwide Express Shipping",
      description: "Fast doorstep delivery across Pakistan with Cash on Delivery (COD) & worldwide dispatch."
    }
  ];

  return (
    <section style={{ padding: '36px 0', borderTop: '1px solid rgba(18, 18, 18, 0.05)', borderBottom: '1px solid rgba(18, 18, 18, 0.05)', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '24px'
          }}
        >
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#C75678',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <Icon style={{ width: '20px', height: '20px' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#121212', marginBottom: '3px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#736C65', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
