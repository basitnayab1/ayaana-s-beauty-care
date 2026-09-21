import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Droplets, ArrowUpRight } from 'lucide-react';

export default function LivingModelPortrait({ hotspots = [], activeSpot, setActiveSpot, onQuickView }) {
  const containerRef = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [smoothTilt, setSmoothTilt] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  // Lifelike blinking cycle (randomized human blink rhythm with occasional double-blink)
  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const scheduleNextBlink = () => {
      // Natural interval between 2.8s and 5.5s
      const delay = Math.random() * 2700 + 2800;

      timeoutId = setTimeout(() => {
        if (!isMounted) return;
        setIsBlinking(true);

        // Blink duration: ~150ms
        setTimeout(() => {
          if (!isMounted) return;
          setIsBlinking(false);

          // 25% chance of a realistic quick double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              if (!isMounted) return;
              setIsBlinking(true);
              setTimeout(() => {
                if (!isMounted) return;
                setIsBlinking(false);
                scheduleNextBlink();
              }, 140);
            }, 120);
          } else {
            scheduleNextBlink();
          }
        }, 160);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Smooth lerp animation loop for face tracking & breathing
  useEffect(() => {
    let startTime = performance.now();

    const loop = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      
      // Subtle autonomous micro-breathing when idle
      const breathX = Math.sin(elapsed * 0.8) * 1.2;
      const breathY = Math.cos(elapsed * 0.6) * 1.5;

      setSmoothTilt((prev) => ({
        x: prev.x + (tilt.x + breathX - prev.x) * 0.08,
        y: prev.y + (tilt.y + breathY - prev.y) * 0.08
      }));

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [tilt]);

  // Handle Mouse Move for 3D Head Tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D rotation angles (-7deg to +7deg)
    const rotateY = ((x - centerX) / centerX) * 6.5;
    const rotateX = -((y - centerY) / centerY) * 5.5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Trigger manual blink on click
  const handleManualBlink = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 200);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleManualBlink}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 'clamp(420px, 52vw, 560px)',
        borderRadius: '28px',
        overflow: 'hidden',
        perspective: '1200px',
        cursor: 'pointer',
        boxShadow: '0 24px 60px -12px rgba(18, 16, 14, 0.28), 0 0 0 1px rgba(226, 130, 159, 0.2)',
        backgroundColor: '#EDE5DC'
      }}
      title="Interactive Living Portrait: Move mouse or tap to see face tilt & blink!"
    >
      {/* 3D Moving Container */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%', // slight bleed to allow 3D translation without clipping borders
          width: '110%',
          height: '110%',
          transform: `perspective(1000px) rotateX(${smoothTilt.x}deg) rotateY(${smoothTilt.y}deg) translateZ(10px)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Base Layer: Open Eyes (High-Resolution Studio Skincare Editorial) */}
        <img
          src="/assets/hero_model_luxury.jpg"
          alt="Ayaana's Radiant Skincare Editorial Model"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />

        {/* Blinking Layer: Natural Closed Eyes Overlay */}
        <img
          src="/assets/hero_model_blink.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            opacity: isBlinking ? 1 : 0,
            transition: isBlinking ? 'opacity 0.04s ease-in' : 'opacity 0.08s ease-out',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />

        {/* Interactive Specular Glint on Dewy Forehead */}
        <div
          style={{
            position: 'absolute',
            top: '26%',
            left: `${52 + smoothTilt.y * 1.2}%`,
            width: '120px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%)',
            filter: 'blur(12px)',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.1s ease-out'
          }}
        />

        {/* Golden Sunbeam & Luxury Atmosphere Particles */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 80% 20%, rgba(255, 240, 215, 0.22) 0%, rgba(0, 0, 0, 0) 65%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Luxury Editorial Vignette (stays framed, enhances text & badges readability) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(14, 14, 18, 0.48) 0%, rgba(14, 14, 18, 0.04) 38%, rgba(14, 14, 18, 0.16) 62%, rgba(14, 14, 18, 0.82) 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Fluted Glass Accent Bar */}
      <div
        className="fluted-glass-effect"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(44px, 10vw, 80px)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(18px, 3vw, 28px) 8px',
          backdropFilter: 'blur(14px)',
          background: 'rgba(255, 255, 255, 0.12)',
          borderRight: '1px solid rgba(255, 255, 255, 0.22)'
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFFFFF', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          AYAANA’S
        </span>
        <div style={{ width: '1px', height: '60px', background: 'rgba(255, 255, 255, 0.45)', margin: 'auto' }} />
        <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.95)', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.12em', fontWeight: 600 }}>
          3D LIVING PORTRAIT
        </span>
      </div>

      {/* Kinetic Headline Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: 'clamp(58px, 14vw, 100px)',
          right: '20px',
          zIndex: 3,
          color: '#FFFFFF',
          textShadow: '0 4px 18px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(226, 130, 159, 0.3)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(255, 255, 255, 0.3)', marginBottom: '8px' }}>
          <Sparkles style={{ width: '12px', height: '12px', color: '#FFD700' }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Interactive 3D Muse</span>
        </div>
        <h2
          className="glow-hover-text"
          style={{
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em'
          }}
        >
          Reveal Your <br />
          <span style={{ color: '#FCD8E3', fontStyle: 'italic', textShadow: '0 0 25px rgba(226, 130, 159, 0.9)' }}>
            Glow ✦
          </span>
        </h2>
        <p style={{ fontSize: '13px', opacity: 0.95, marginTop: '8px', maxWidth: '240px', lineHeight: 1.45 }}>
          Hydrate, restore, and illuminate your skin with active bio-botanicals.
        </p>
      </div>

      {/* Floating 3D Micro-Badge on Model */}
      <div
        className="floating-badge-1"
        style={{
          position: 'absolute',
          bottom: '80px',
          left: 'clamp(58px, 14vw, 100px)',
          zIndex: 4,
          background: 'rgba(18, 18, 18, 0.78)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          padding: '6px 14px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#FFFFFF',
          fontSize: '11px',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
        }}
      >
        <Droplets style={{ width: '13px', height: '13px', color: '#E2829F' }} />
        <span>72-Hour Cellular Hydration</span>
      </div>

      {/* Interactive Radiance Hotspots */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          style={{
            position: 'absolute',
            top: spot.top,
            left: spot.left,
            zIndex: 5,
            cursor: 'pointer'
          }}
          onMouseEnter={() => setActiveSpot(spot.id)}
          onMouseLeave={() => setActiveSpot(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveSpot(activeSpot === spot.id ? null : spot.id);
          }}
        >
          <div
            className="radiance-spot"
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '3.5px solid #E2829F',
              boxShadow: '0 0 18px rgba(226, 130, 159, 0.95)'
            }}
          />

          {/* Hotspot Tooltip */}
          {activeSpot === spot.id && (
            <div
              style={{
                position: 'absolute',
                bottom: '26px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '220px',
                padding: '14px',
                background: 'rgba(18, 18, 18, 0.92)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                border: '1px solid rgba(226, 130, 159, 0.5)',
                color: '#FFFFFF',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                pointerEvents: 'none',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Sparkles style={{ width: '13px', height: '13px', color: '#E2829F' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#E2829F' }}>{spot.title}</span>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4, margin: 0 }}>
                {spot.desc}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Corner Quick Arrow */}
      {onQuickView && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView();
          }}
          style={{
            position: 'absolute',
            bottom: '22px',
            right: '22px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#E2829F',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#FFFFFF',
            boxShadow: '0 8px 25px rgba(226, 130, 159, 0.5)',
            zIndex: 6,
            transition: 'all 0.3s ease'
          }}
          aria-label="View featured product"
        >
          <ArrowUpRight style={{ width: '22px', height: '22px' }} />
        </button>
      )}
    </div>
  );
}
