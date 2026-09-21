import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, Tag, Truck } from 'lucide-react';
import { BRAND_CONFIG } from '../data/products';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    formatPrice,
    formatCurrency,
    currency,
    cartSubtotalPKR,
    cartSubtotalUSD,
    cartSubtotal,
    discountAmount,
    appliedDiscount,
    applyCoupon,
    removeCoupon,
    couponCode,
    setCouponCode,
    isFreeShipping,
    cartTotal,
    generateWhatsAppOrderUrl,
    setIsCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  // Free shipping threshold calculations
  const threshold = currency === 'USD' ? BRAND_CONFIG.shippingThresholdUSD : BRAND_CONFIG.shippingThresholdPKR;
  const remainingForFree = Math.max(0, threshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / threshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      alert(res.message);
    }
  };

  return (
    <div className="overlay-backdrop" onClick={() => setIsCartOpen(false)}>
      <div
        className="slide-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#FDFBF7',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Drawer Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(18, 18, 18, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag style={{ width: '20px', height: '20px', color: '#121212' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Your Luxury Bag</h3>
            <span style={{ fontSize: '12px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose-dark)', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#121212' }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '12px 24px', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#121212', marginBottom: '6px' }}>
            <Truck style={{ width: '14px', height: '14px', color: isFreeShipping ? '#128C7E' : '#C75678' }} />
            {isFreeShipping ? (
              <span style={{ color: '#128C7E' }}>🎉 Congratulations! You have unlocked FREE Express Delivery!</span>
            ) : (
              <span>Add {formatCurrency(remainingForFree)} more for <strong>FREE Express Delivery</strong></span>
            )}
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: isFreeShipping ? '#128C7E' : '#E2829F',
                transition: 'width 0.3s ease-out'
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: '40px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#9B948C' }}>
                <ShoppingBag style={{ width: '28px', height: '28px' }} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Your bag is currently empty</h4>
              <p style={{ fontSize: '13px', color: '#736C65', maxWidth: '240px', margin: '0 auto 20px auto' }}>
                Discover our dermatologist-tested creams and radiance elixirs to begin your ritual.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ fontSize: '13px', padding: '10px 22px' }}
              >
                Explore Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.volume}`}
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
                {/* Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                />

                {/* Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#121212', lineHeight: 1.25 }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id, item.volume)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B948C', padding: '2px' }}
                        title="Remove"
                      >
                        <Trash2 style={{ width: '15px', height: '15px' }} />
                      </button>
                    </div>

                    <span style={{ fontSize: '11px', color: '#736C65', fontWeight: 600 }}>
                      Volume: {item.volume}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', padding: '3px 8px', borderRadius: '9999px', border: '1px solid rgba(0,0,0,0.05)' }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.volume, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#121212' }}
                      >
                        <Minus style={{ width: '12px', height: '12px' }} />
                      </button>
                      <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.volume, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#121212' }}
                      >
                        <Plus style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>

                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#121212' }}>
                      {formatPrice(item.pricePKR * item.quantity, item.priceUSD * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Financials & Checkout */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(18, 18, 18, 0.08)', boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.04)' }}>
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Tag style={{ width: '14px', height: '14px', color: '#736C65', position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code (GLOW10)"
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 34px',
                    borderRadius: '8px',
                    border: '1px solid rgba(18, 18, 18, 0.12)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    outline: 'none',
                    backgroundColor: 'var(--bg-surface)'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#121212',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Apply
              </button>
            </form>

            {/* Active Coupon Badge */}
            {appliedDiscount && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--brand-rose-light)', padding: '6px 12px', borderRadius: '8px', fontSize: '11.5px', color: 'var(--brand-rose-dark)', marginBottom: '12px' }}>
                <span>✓ {appliedDiscount.label}</span>
                <button
                  onClick={removeCoupon}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline', color: 'var(--brand-rose-dark)' }}
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#736C65', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ color: '#121212', fontWeight: 600 }}>{formatPrice(cartSubtotalPKR, cartSubtotalUSD)}</span>
              </div>

              {appliedDiscount && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C75678' }}>
                  <span>Discount ({appliedDiscount.percent}%)</span>
                  <span style={{ fontWeight: 600 }}>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Express Courier Shipping</span>
                <span style={{ color: isFreeShipping ? '#128C7E' : '#121212', fontWeight: 600 }}>
                  {isFreeShipping ? "FREE" : formatPrice(BRAND_CONFIG.expressDeliveryFeePKR, BRAND_CONFIG.expressDeliveryFeeUSD)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 800, color: '#121212', paddingTop: '8px', borderTop: '1px solid rgba(18, 18, 18, 0.08)' }}>
                <span>Total Amount</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* WhatsApp 1-Click Order */}
              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ width: '100%', textDecoration: 'none', boxSizing: 'border-box' }}
              >
                <MessageCircle style={{ width: '18px', height: '18px' }} />
                <span>1-Click Order via WhatsApp</span>
              </a>

              {/* Online Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <span>Proceed to Online Checkout</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
