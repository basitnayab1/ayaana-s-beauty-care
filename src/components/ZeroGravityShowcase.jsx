import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Eye,
  Star,
  Play,
  Pause,
  Maximize2,
  CheckCircle2,
  Zap
} from 'lucide-react';
import ZeroGravityCanvasEngine from './ZeroGravityCanvasEngine';

const ZERO_GRAVITY_SLIDES = [
  {
    productId: 'hand-and-feet-whitening-cream',
    image: '/assets/zero_gravity_hand_cream.jpg',
    tag: 'Bestseller • Zero Gravity',
    title: 'Hand & Feet Whitening Cream',
    subtitle: 'Suspended Radiance & Deep Barrier Renewal',
    highlight: 'Pure Rose Hydrosol • Niacinamide • Alpha-Arbutin',
    accentColor: '#E2829F',
    quote: 'Target stubborn dark knuckles and roughness with pure botanical levitation.'
  },
  {
    productId: 'face-whitening-cream',
    image: '/assets/zero_gravity_face_cream.jpg',
    tag: 'Iconic Glow • Pure Botanical',
    title: 'Face Whitening Cream',
    subtitle: 'Lit-From-Within Cellular Radiance & Clarity',
    highlight: 'Alpha-Arbutin • Squalane • Hyaluronic Complex',
    accentColor: '#E08298',
    quote: 'Ultra-lightweight velvet cream for a flawless spotless glow.'
  },
  {
    productId: '24k-gold-radiance-glow-serum',
    image: '/assets/zero_gravity_gold_serum.jpg',
    tag: '24K Pure Gold • Cellular Elixir',
    title: '24K Gold Radiance Glow Serum',
    subtitle: 'Weightless Liquid Gold & Collagen Synthesis',
    highlight: 'Suspended 24K Flakes • Triple Hyaluronic • Vitamin C',
    accentColor: '#D4AF37',
    quote: 'Instant glass-skin sheen with genuine suspended 24K cosmetic gold.'
  },
  {
    productId: 'whitening-toner',
    image: '/assets/zero_gravity_whitening_toner.jpg',
    tag: 'Hydra-Mist • Zero Gravity Splash',
    title: 'Whitening Toner',
    subtitle: 'Cryo-Refreshing Botanical Dew & Pore Clarity',
    highlight: 'Rosa Damascena • Witch Hazel • Niacinamide (5%)',
    accentColor: '#C75678',
    quote: 'pH-balancing cooling mist that preps skin and tightens open pores.'
  },
  {
    productId: 'natural-glow-mask',
    image: '/assets/zero_gravity_glow_mask.jpg',
    tag: '15-Min Flash Radiance',
    title: 'Natural Glow Mask',
    subtitle: 'Petal-Infused Kaolin Clay & Lit Radiance',
    highlight: 'Organic Kaolin Clay • Rose Hydrosol • Allantoin',
    accentColor: '#E2829F',
    quote: 'Draws out deep toxins while infusing precious rose moisture.'
  },
  {
    productId: 'ayaana-herbal-hair-shampoo',
    image: '/assets/zero_gravity_herbal_shampoo.jpg',
    tag: 'Ayurvedic Botanical Cleanse',
    title: 'Ayaana Herbal Hair Shampoo',
    subtitle: 'Scalp Detox & Deep Melanin Root Strength',
    highlight: 'Fresh Amla • Reetha Pods • Shikakai Botanicals',
    accentColor: '#2D8A61',
    quote: '100% sulfate-free traditional herbal formula for thick, lustrous hair.'
  },
  {
    productId: 'ayaana-herbal-oil',
    image: '/assets/zero_gravity_herbal_oil.jpg',
    tag: 'Root Revitalizing Hair Elixir',
    title: 'Ayaana Herbal Oil',
    subtitle: 'Cold-Pressed Kalonji & Follicle Activator',
    highlight: 'Black Seed (Kalonji) • Rosemary Oil • Bhringraj',
    accentColor: '#C48827',
    quote: 'Deeply nourishes roots and stops hair fall with pure cold-pressed herbs.'
  },
  {
    productId: 'natural-weight-loss-powder',
    image: '/assets/zero_gravity_weight_loss.jpg',
    tag: '100% Herbal Detox Supplement',
    title: 'Natural Weight Loss Powder',
    subtitle: 'Metabolic Detox Herbs & Natural Fat Burning',
    highlight: 'Fennel • Cumin • Garcinia Cambogia • Triphala',
    accentColor: '#C2843A',
    quote: 'Gentle daily cleanse that supports healthy metabolism and relieves bloating.'
  }
];

export default function ZeroGravityShowcase() {
  const { products, formatPrice, setActiveProduct, addToCart, setIsCartOpen } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo'
  const [is3DInteracting, setIs3DInteracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  const slideDuration = 5000; // 5 seconds per slide
  const timerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const showcaseRef = useRef(null);

  const currentSlide = ZERO_GRAVITY_SLIDES[currentIndex];
  const linkedProduct = products.find((p) => p.id === currentSlide.productId) || products[0];

  // Auto-play timer (pauses when user is interacting with 3D Zero-G model)
  useEffect(() => {
    // If user is actively playing with the 3D model on slide 0, hold slide
    if (!isPlaying || (currentIndex === 0 && viewMode === '3d' && is3DInteracting)) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    setProgress(0);
    const interval = 50;
    const step = (interval / slideDuration) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + step));
    }, interval);

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ZERO_GRAVITY_SLIDES.length);
      setProgress(0);
    }, slideDuration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ZERO_GRAVITY_SLIDES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ZERO_GRAVITY_SLIDES.length) % ZERO_GRAVITY_SLIDES.length);
    setProgress(0);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (linkedProduct) {
      addToCart(linkedProduct);
      setIsCartOpen(true);
    }
  };

  // Subtle 3D mouse parallax
  const handleMouseMove = (e) => {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsPlaying(true);
  };

  // Mobile Touch Swipe Handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    setIsPlaying(false);
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section
      id="zero-gravity-showcase"
      style={{
        padding: '60px 0 80px 0',
        backgroundColor: '#0D0B0A',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes zeroGravityFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.4deg);
          }
        }
        @keyframes subtleScale {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.04);
          }
        }
        @keyframes auraGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.08);
          }
        }
        .zg-thumb-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .zg-thumb-btn:hover {
          transform: translateY(-3px) scale(1.04);
        }
        .zg-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(226, 130, 159, 0.35);
        }
      `}</style>

      {/* Atmospheric Ambient Aura Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75vw',
          height: '400px',
          background: `radial-gradient(circle, ${currentSlide.accentColor}25 0%, transparent 70%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'background 0.8s ease'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Top Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: currentSlide.accentColor,
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '14px',
              backdropFilter: 'blur(12px)',
              transition: 'color 0.4s ease'
            }}
          >
            <Sparkles style={{ width: '13px', height: '13px' }} />
            <span>0-GRAVITY CINEMATIC SHOWCASE • 8K ULTRA DETAIL</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(26px, 4.2vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#FFFFFF'
            }}
          >
            Weightless Botanicals in{' '}
            <span
              style={{
                background: `linear-gradient(135deg, #FFFFFF 20%, ${currentSlide.accentColor} 85%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic',
                transition: 'all 0.5s ease'
              }}
            >
              Pure Zero Gravity
            </span>
          </h2>
          <p
            style={{
              color: '#A89F95',
              fontSize: '14.5px',
              marginTop: '10px',
              lineHeight: 1.6
            }}
          >
            Experience our complete luxury catalog suspended in weightless space. Explore authentic 8K macro textures, floating active extracts, and cellular rejuvenation.
          </p>
        </div>

        {/* 16:9 Zero-Gravity Cinematic Theatre */}
        <div
          ref={showcaseRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            maxHeight: '740px',
            minHeight: '260px',
            borderRadius: 'clamp(18px, 2.5vw, 28px)',
            overflow: 'hidden',
            backgroundColor: '#050403',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(226, 130, 159, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            transform: `perspective(1200px) rotateY(${mouseOffset.x}deg) rotateX(${-mouseOffset.y}deg)`,
            transition: isPlaying ? 'transform 0.5s ease-out' : 'transform 0.15s ease-out'
          }}
        >
          {/* Active 16:9 Zero-Gravity Master Design Layer (Original Crisp 8K Quality & Perfect Branding) */}
          <div
            key={currentIndex}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              animation: 'zeroGravityFloat 6s ease-in-out infinite'
            }}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                animation: 'subtleScale 6s ease-out forwards',
                filter: 'brightness(1.02) contrast(1.02)'
              }}
            />
          </div>

          {/* Real Moving 3D Zero-Gravity Particles (Three.js WebGL Engine) */}
          {currentIndex === 0 && (
            <ZeroGravityCanvasEngine
              accentColor={currentSlide.accentColor}
              onInteractChange={(interacting) => {
                setIs3DInteracting(interacting);
                if (interacting) setIsPlaying(false);
              }}
            />
          )}

          {/* Vignette & Cinematic Gradients */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(5,4,3,0.5) 85%, rgba(5,4,3,0.85) 100%)',
              pointerEvents: 'none',
              zIndex: 12
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '65%',
              background: 'linear-gradient(to top, rgba(5,4,3,0.92) 0%, rgba(5,4,3,0.35) 60%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 12
            }}
          />

          {/* Top Bar Controls Inside Theatre */}
          <div
            style={{
              position: 'absolute',
              top: 'clamp(12px, 2.5vw, 22px)',
              left: 'clamp(14px, 2.5vw, 28px)',
              right: 'clamp(14px, 2.5vw, 28px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 25
            }}
          >
            {/* Tag Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(18, 18, 18, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(12px)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: currentSlide.accentColor,
                    display: 'inline-block',
                    boxShadow: `0 0 10px ${currentSlide.accentColor}`
                  }}
                />
                <span>{currentSlide.tag}</span>
              </div>

              {currentIndex === 0 && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(18, 18, 18, 0.85)',
                    border: '1px solid rgba(226, 130, 159, 0.45)',
                    color: '#E2829F',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  <Sparkles style={{ width: '12px', height: '12px' }} />
                  <span>3D Zero-G Particles Active</span>
                </div>
              )}
            </div>

            {/* Play/Pause & Fullscreen Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(18, 18, 18, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                title={isPlaying ? 'Pause 0-Gravity slides' : 'Resume auto-play'}
              >
                {isPlaying ? <Pause style={{ width: '15px', height: '15px' }} /> : <Play style={{ width: '15px', height: '15px' }} />}
              </button>

              <button
                onClick={() => setIsFullscreenModalOpen(true)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(18, 18, 18, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                title="View full 8K master visual"
              >
                <Maximize2 style={{ width: '15px', height: '15px' }} />
              </button>
            </div>
          </div>

          {/* Bottom Floating Editorial Overlay Card */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(14px, 2.5vw, 28px)',
              left: 'clamp(14px, 2.5vw, 28px)',
              right: 'clamp(14px, 2.5vw, 28px)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}
          >
            {/* Left: Product Info in Glass Card */}
            <div
              style={{
                backgroundColor: 'rgba(18, 16, 15, 0.78)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: 'clamp(14px, 2vw, 22px)',
                borderRadius: '20px',
                maxWidth: '560px',
                animation: 'zeroGravityFloat 6s ease-in-out infinite'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: currentSlide.accentColor
                  }}
                >
                  {currentSlide.subtitle}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#FFD700', fontSize: '12px' }}>
                  <Star style={{ width: '13px', height: '13px', fill: '#FFD700' }} />
                  <span style={{ fontWeight: 800 }}>{linkedProduct?.rating || 4.9}</span>
                </div>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(19px, 2.5vw, 28px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  margin: '0 0 6px 0',
                  lineHeight: 1.15
                }}
              >
                {currentSlide.title}
              </h3>

              <p
                style={{
                  fontSize: 'clamp(11.5px, 1.2vw, 13px)',
                  color: '#D4CDC5',
                  margin: '0 0 10px 0',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {currentSlide.quote}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11.5px',
                  color: '#A89F95',
                  paddingTop: '6px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <CheckCircle2 style={{ width: '14px', height: '14px', color: currentSlide.accentColor }} />
                <span>Active: <strong>{currentSlide.highlight}</strong></span>
              </div>
            </div>

            {/* Right: Price & Quick Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(18, 16, 15, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: 'clamp(10px, 1.5vw, 16px) clamp(14px, 2vw, 20px)',
                borderRadius: '18px'
              }}
            >
              {linkedProduct && (
                <div style={{ textAlign: 'right', marginRight: '6px' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#A89F95', fontWeight: 600 }}>
                    Price
                  </div>
                  <div style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                    {formatPrice(linkedProduct.pricePKR, linkedProduct.priceUSD)}
                  </div>
                </div>
              )}

              <button
                onClick={() => linkedProduct && setActiveProduct(linkedProduct)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '9px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Eye style={{ width: '14px', height: '14px' }} />
                <span className="mobile-hide">Details</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="btn-primary zg-action-btn"
                style={{
                  padding: '9px 18px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '12px'
                }}
              >
                <ShoppingBag style={{ width: '15px', height: '15px' }} />
                <span>Order Now</span>
              </button>
            </div>
          </div>

          {/* Left / Right Cinema Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous 0-gravity slide"
            style={{
              position: 'absolute',
              left: 'clamp(10px, 2vw, 20px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(36px, 4vw, 46px)',
              height: 'clamp(36px, 4vw, 46px)',
              borderRadius: '50%',
              backgroundColor: 'rgba(18, 18, 18, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 15,
              transition: 'all 0.2s'
            }}
          >
            <ChevronLeft style={{ width: '22px', height: '22px' }} />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next 0-gravity slide"
            style={{
              position: 'absolute',
              right: 'clamp(10px, 2vw, 20px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(36px, 4vw, 46px)',
              height: 'clamp(36px, 4vw, 46px)',
              borderRadius: '50%',
              backgroundColor: 'rgba(18, 18, 18, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 15,
              transition: 'all 0.2s'
            }}
          >
            <ChevronRight style={{ width: '22px', height: '22px' }} />
          </button>

          {/* Slim Progress Bar at the very bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              zIndex: 20
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: currentSlide.accentColor,
                transition: isPlaying ? 'width 0.05s linear' : 'none'
              }}
            />
          </div>
        </div>

        {/* 16:9 Thumbnail Reel for Instant Jumping */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(8px, 1.5vw, 14px)',
            marginTop: '22px',
            overflowX: 'auto',
            padding: '8px 4px',
            scrollbarWidth: 'none'
          }}
        >
          {ZERO_GRAVITY_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.productId}
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className="zg-thumb-btn"
                style={{
                  position: 'relative',
                  width: 'clamp(70px, 9vw, 105px)',
                  aspectRatio: '16 / 9',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: isActive ? `2px solid ${slide.accentColor}` : '1px solid rgba(255, 255, 255, 0.18)',
                  backgroundColor: '#1E1B19',
                  cursor: 'pointer',
                  padding: 0,
                  opacity: isActive ? 1 : 0.6,
                  boxShadow: isActive ? `0 4px 16px ${slide.accentColor}40` : 'none',
                  flexShrink: 0
                }}
                title={slide.title}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      border: '2px solid #FFFFFF',
                      borderRadius: '8px',
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Master Modal */}
      {isFullscreenModalOpen && (
        <div
          onClick={() => setIsFullscreenModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '1280px',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#050403' }}
            />
            <button
              onClick={() => setIsFullscreenModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(18, 18, 18, 0.8)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              ✕ Close 8K View
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
