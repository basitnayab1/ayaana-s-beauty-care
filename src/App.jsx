import React, { useState, useRef } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BrandValues from './components/BrandValues';
import Marquee3D from './components/Marquee3D';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import BeforeAfterSection from './components/BeforeAfterSection';
import ProductSpotlight from './components/ProductSpotlight';
import RitualGuide from './components/RitualGuide';
import ReviewsSection from './components/ReviewsSection';
import WhatsAppBanner from './components/WhatsAppBanner';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductModal from './components/ProductModal';
import CustomCursor from './components/CustomCursor';
import ThreeBackground from './components/ThreeBackground';
import { MessageCircle, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from './data/products';

// Code-split heavy modals to keep initial bundle ultra light on mobile
const CheckoutModal = React.lazy(() => import('./components/CheckoutModal'));
const OrderTrackingModal = React.lazy(() => import('./components/OrderTrackingModal'));
const AdminModal = React.lazy(() => import('./components/AdminModal'));


function MainStore() {
  const { products } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const catalogRef = useRef(null);

  // Filter products
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* 1. Interactive 3D WebGL Particle Background */}
      <ThreeBackground />

      {/* 2. Custom Luxury 3D Cursor & Glowing Aura */}
      <CustomCursor />

      {/* 3. Header & Navigation */}
      <Navbar
        onCategorySelect={handleCategorySelect}
        onScrollToSection={handleScrollToSection}
      />

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* 4. Immersive 3D Hero Section */}
        <HeroSection
          onShopNowClick={() => {
            if (catalogRef.current) {
              catalogRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* 5. Tilted 3D Perspective Marquee Ribbon */}
        <Marquee3D />

        {/* 6. Luxury Brand Assurances */}
        <BrandValues />

        {/* 7. Product Catalog Feed with 3D Gyroscopic Perspective Tilt */}
        <section ref={catalogRef} id="catalog" style={{ padding: '80px 0 60px 0' }}>
          <div className="container">
            {/* Section Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--brand-rose-light)', color: 'var(--brand-rose-dark)', padding: '6px 16px', borderRadius: '9999px', fontSize: '11.5px', fontWeight: 800, letterSpacing: '0.06em', marginBottom: '12px' }}>
                <Sparkles style={{ width: '13px', height: '13px' }} />
                CURATED BOTANICAL FORMULATIONS
              </div>
              <h2
                className="glow-hover-text"
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15
                }}
              >
                The Radiance <span style={{ color: '#C75678', fontStyle: 'italic' }}>Collection</span>
              </h2>
              <p style={{ color: '#736C65', fontSize: '15px', marginTop: '8px', maxWidth: '520px' }}>
                Hover over any formulation to experience interactive 3D depth, light refractions, and clinical active ingredient breakdown.
              </p>
            </div>

            {/* Category Filter Pills */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Products Grid with 3D Tilt Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                gap: '24px'
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* 8. Real Before & After Slider (Verified WhatsApp Proof) */}
        <BeforeAfterSection />

        {/* 9. 3D Product Spotlight & Ingredient Science */}
        <ProductSpotlight />

        {/* 10. 3-Step Daily Radiance Ritual */}
        <RitualGuide />

        {/* 11. Customer Testimonials & WhatsApp Reviews */}
        <ReviewsSection />

        {/* 12. VIP WhatsApp Skin Concierge */}
        <WhatsAppBanner />
      </main>

      {/* 13. Luxury Editorial Footer */}
      <Footer
        onCategorySelect={handleCategorySelect}
        onScrollToSection={handleScrollToSection}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${BRAND_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent("Hello Ayaana's! I am browsing your online store and would like to order or ask a question.")}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          zIndex: 90,
          textDecoration: 'none',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="animate-float"
        title="Chat with Ayaana on WhatsApp"
      >
        <MessageCircle style={{ width: '28px', height: '28px' }} />
      </a>

      {/* Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductModal />
      <React.Suspense fallback={null}>
        <CheckoutModal />
        <OrderTrackingModal />
        <AdminModal />
      </React.Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainStore />
    </ShopProvider>
  );
}
