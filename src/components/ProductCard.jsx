import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import Tilt3DCard from './Tilt3DCard';
import { Heart, ArrowUpRight, ShoppingBag, MessageCircle, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveProduct,
    generateSingleProductWhatsAppUrl
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <Tilt3DCard
      maxTilt={16}
      scale={1.03}
      onClick={() => setActiveProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-card-${product.id}`}
      className="card-3d"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '18px',
        cursor: 'pointer',
        height: '100%',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid var(--border-card)'
      }}
    >
      {/* 3D Popping Media Container (translateZ 35px) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '18px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          marginBottom: '16px',
          transform: 'translateZ(35px)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
        />

        {/* 3D Floating Badges Bar (translateZ 55px) */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
            transform: 'translateZ(55px)'
          }}
        >
          {/* Volume Badge */}
          <span
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 800,
              color: '#121212',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)'
            }}
          >
            {product.volume}
          </span>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isFavorited ? '#E2829F' : '#121212',
              transition: 'transform 0.25s',
              transform: isFavorited ? 'scale(1.15)' : 'scale(1)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)'
            }}
            aria-label="Save to Wishlist"
          >
            <Heart
              style={{
                width: '16px',
                height: '16px',
                fill: isFavorited ? '#E2829F' : 'none'
              }}
            />
          </button>
        </div>

        {/* 3D Promo Tag */}
        {product.badge && (
          <span
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: '#121212',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '6px',
              transform: 'translateZ(50px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
          >
            {product.badge}
          </span>
        )}

        {/* 3D Inspection Corner Button (translateZ 65px) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveProduct(product);
          }}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '40px',
            height: '40px',
            backgroundColor: '#121212',
            color: '#FFFFFF',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateZ(65px)',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)'
          }}
          title="3D Inspection & Details"
        >
          <ArrowUpRight style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

      {/* 3D Bottom Content Box (translateZ 40px) */}
      <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
          <div style={{ display: 'flex', color: '#D6A685' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} style={{ width: '12px', height: '12px', fill: '#D6A685' }} />
            ))}
          </div>
          <span style={{ fontSize: '11px', color: '#736C65', fontWeight: 600 }}>
            ({product.reviewsCount.toLocaleString()})
          </span>
        </div>

        {/* Title */}
        <h3
          className="glow-hover-text"
          style={{
            fontSize: '16.5px',
            fontWeight: 800,
            lineHeight: 1.25,
            color: '#121212',
            marginBottom: '4px'
          }}
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontSize: '12px',
            color: '#736C65',
            lineHeight: 1.4,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.tagline}
        </p>

        {/* Price & Add to Bag Row (translateZ 50px) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid rgba(18, 18, 18, 0.06)',
            transform: 'translateZ(50px)'
          }}
        >
          <div>
            <div style={{ fontSize: '17.5px', fontWeight: 800, color: '#121212' }}>
              {formatPrice(product.pricePKR, product.priceUSD)}
            </div>
            <div style={{ fontSize: '11.5px', color: '#9B948C', textDecoration: 'line-through' }}>
              {formatPrice(product.originalPricePKR, product.originalPriceUSD)}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Direct WhatsApp Quick Order */}
            <a
              href={generateSingleProductWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#128C7E',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 10px rgba(18, 140, 126, 0.25)'
              }}
              title="Order on WhatsApp"
            >
              <MessageCircle style={{ width: '16px', height: '16px' }} />
            </a>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddToCart}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: addedAnimation ? '#C75678' : '#121212',
                color: '#FFFFFF',
                border: 'none',
                padding: '9px 15px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <ShoppingBag style={{ width: '13px', height: '13px' }} />
              <span>{addedAnimation ? "Added ✓" : "Add"}</span>
            </button>
          </div>
        </div>
      </div>
    </Tilt3DCard>
  );
}
