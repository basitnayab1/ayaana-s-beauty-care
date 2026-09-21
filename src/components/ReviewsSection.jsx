import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "Sania Tariq",
      city: "Lahore",
      product: "Hand & Foot Complex + Skin Repair Cream",
      rating: 5,
      date: "3 days ago",
      text: "Se boht zyada bright howy n 😊 Mai apko before and after ke picture bi send krti hu abi 🤗 Mere dark knuckles par koi cream asar nahi kar rahi thi, Ayaana's ke 1 week use ke baad difference clear hai!",
      verified: true
    },
    {
      id: 2,
      name: "Dr. Fatima Zahra",
      city: "Islamabad",
      product: "Radiance Skin Repair Cream",
      rating: 5,
      date: "1 week ago",
      text: "As a physician, I check ingredient lists very strictly. The balance of 5% niacinamide with pure bio-ceramides is formulated to international dermatology standards. My dry winter skin has completely healed.",
      verified: true
    },
    {
      id: 3,
      name: "Areeba Khan",
      city: "Karachi",
      product: "24K Gold Radiance Glow Serum",
      rating: 5,
      date: "2 weeks ago",
      text: "The gold serum gives an unbelievable glass-skin dewy finish under makeup! Not sticky at all, it absorbs in 30 seconds and gives this ethereal lit-from-within glow.",
      verified: true
    },
    {
      id: 4,
      name: "Hira Mansoor",
      city: "Faisalabad",
      product: "Herbal Whitening & Radiance Toner",
      rating: 5,
      date: "2 weeks ago",
      text: "The natural rose hydrosol smell is divine. My enlarged pores around the nose area tightened up so fast. Best toner I have ever used in Pakistan.",
      verified: true
    },
    {
      id: 5,
      name: "Zainab Mir",
      city: "Dubai, UAE",
      product: "Complete Radiance Bundle",
      rating: 5,
      date: "3 weeks ago",
      text: "Ordered the full collection to Dubai and it arrived via DHL safely packed with luxury gift ribbon. The packaging looks so high end, exactly like French luxury cosmetic brands.",
      verified: true
    },
    {
      id: 6,
      name: "Mahnoor Bilal",
      city: "Rawalpindi",
      product: "Miracle Glow Night Balm",
      rating: 5,
      date: "1 month ago",
      text: "Waking up with zero dullness is real! My skin feels super soft and plump every morning. Ayaana is also very responsive on WhatsApp for advice.",
      verified: true
    }
  ];

  return (
    <section id="reviews" style={{ padding: '80px 0', backgroundColor: 'var(--bg-base)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose-dark)', padding: '5px 14px', borderRadius: '9999px', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '12px' }}>
            <Star style={{ width: '13px', height: '13px', fill: '#C75678' }} />
            4.9 OUT OF 5.0 RATED BY OVER 7,500 WOMEN
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Loved by Thousands, <br />
            <span style={{ color: '#C75678', fontStyle: 'italic' }}>Proven by Real Skin</span>
          </h2>
          <p style={{ color: '#736C65', fontSize: '15px', marginTop: '12px' }}>
            Discover authentic testimonials and WhatsApp messages from customers across Pakistan and overseas who transformed their skin.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '24px'
          }}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="card-3d"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Top Row: Stars & Date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', color: '#D6A685', gap: '2px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} style={{ width: '14px', height: '14px', fill: '#D6A685' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', color: '#9B948C' }}>{rev.date}</span>
                </div>

                {/* Review Text */}
                <p style={{ fontSize: '13.5px', color: '#2E2B28', lineHeight: 1.5, marginBottom: '18px', fontStyle: 'italic' }}>
                  “{rev.text}”
                </p>
              </div>

              {/* Bottom Row: Customer Info */}
              <div style={{ borderTop: '1px solid rgba(18, 18, 18, 0.05)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#121212' }}>{rev.name}</h4>
                    <span style={{ fontSize: '11px', color: '#736C65' }}>• {rev.city}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#C75678', fontWeight: 600, marginTop: '2px' }}>
                    {rev.product}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#128C7E', fontSize: '11px', fontWeight: 600 }}>
                  <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
