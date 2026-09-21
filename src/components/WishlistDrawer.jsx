import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart, formatPrice, setActiveProduct } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="overlay-backdrop" onClick={() => setIsWishlistOpen(false)}>
      <div
        className="slide-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: '#FDFBF7',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(18, 18, 18, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart style={{ width: '20px', height: '20px', color: '#C75678', fill: '#C75678' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Your Wishlist</h3>
            <span style={{ fontSize: '12px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose-dark)', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
              {wishlist.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#121212' }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: '40px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#9B948C' }}>
                <Heart style={{ width: '28px', height: '28px' }} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Your wishlist is empty</h4>
              <p style={{ fontSize: '13px', color: '#736C65', maxWidth: '240px', margin: '0 auto 20px auto' }}>
                Save your favorite radiance creams and toners to easily revisit them anytime.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="btn-primary"
                style={{ fontSize: '13px', padding: '10px 22px' }}
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-card)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0, cursor: 'pointer' }}
                  onClick={() => {
                    setActiveProduct(item);
                    setIsWishlistOpen(false);
                  }}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
                      <h4
                        onClick={() => {
                          setActiveProduct(item);
                          setIsWishlistOpen(false);
                        }}
                        style={{ fontSize: '13.5px', fontWeight: 700, color: '#121212', cursor: 'pointer', lineHeight: 1.25 }}
                      >
                        {item.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(item)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B948C', padding: '2px' }}
                      >
                        <Trash2 style={{ width: '15px', height: '15px' }} />
                      </button>
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#121212', marginTop: '4px' }}>
                      {formatPrice(item.pricePKR, item.priceUSD)}
                    </div>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <button
                      onClick={() => {
                        addToCart(item, 1);
                        toggleWishlist(item);
                      }}
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: '11.5px', width: '100%' }}
                    >
                      <ShoppingBag style={{ width: '13px', height: '13px' }} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
