import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeHeroJar({ className = "" }) {
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Root Group for rotations
    const jarGroup = new THREE.Group();
    scene.add(jarGroup);

    // Materials
    // 1. Brushed Rose Gold Metallic Cap
    const capMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E4A895'),
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.5
    });

    // 2. Heavy Frosted Cosmetic Glass Jar
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FAF7F2'),
      metalness: 0.05,
      roughness: 0.12,
      transmission: 0.82,
      thickness: 1.1,
      ior: 1.5,
      transparent: true,
      opacity: 0.92
    });

    // 3. Luxurious Ivory Cream Inside
    const creamMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFDF9'),
      roughness: 0.45,
      metalness: 0.05
    });

    // 4. Gold Rim Accent
    const goldRimMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ECC79B'),
      metalness: 0.95,
      roughness: 0.15
    });

    // Geometry Assembly
    // Glass Body: Cylinder with rounded feel
    const glassGeo = new THREE.CylinderGeometry(0.95, 0.92, 0.9, 48, 1);
    const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
    glassMesh.position.y = -0.2;
    glassMesh.castShadow = true;
    glassMesh.receiveShadow = true;
    jarGroup.add(glassMesh);

    // Inner Cream Core
    const creamGeo = new THREE.CylinderGeometry(0.86, 0.84, 0.78, 36);
    const creamMesh = new THREE.Mesh(creamGeo, creamMaterial);
    creamMesh.position.y = -0.21;
    jarGroup.add(creamMesh);

    // Thin Rose Gold Separator Ring
    const ringGeo = new THREE.TorusGeometry(0.93, 0.02, 16, 48);
    const ringMesh = new THREE.Mesh(ringGeo, goldRimMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.25;
    jarGroup.add(ringMesh);

    // Rose Gold Lid / Cap
    const capGeo = new THREE.CylinderGeometry(0.96, 0.96, 0.48, 48);
    const capMesh = new THREE.Mesh(capGeo, capMaterial);
    capMesh.position.y = 0.51;
    capMesh.castShadow = true;
    jarGroup.add(capMesh);

    // Cap Top Bevel Ring
    const capBevelGeo = new THREE.CylinderGeometry(0.94, 0.96, 0.04, 48);
    const capBevelMesh = new THREE.Mesh(capBevelGeo, capMaterial);
    capBevelMesh.position.y = 0.75;
    jarGroup.add(capBevelMesh);

    // Subtle Travertine Pedestal underneath
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.45, 0.15, 48);
    const pedestalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EFEAE1'),
      roughness: 0.85,
      metalness: 0.02
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMaterial);
    pedestalMesh.position.y = -0.73;
    pedestalMesh.receiveShadow = true;
    scene.add(pedestalMesh);

    // Ambient Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.8, 2.8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.81;
    scene.add(shadowMesh);

    // Radiance Floating Particles
    const particleCount = 35;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.1 + Math.random() * 1.3;
      const y = -0.5 + Math.random() * 1.8;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
      particleSpeeds.push({
        angle,
        radius,
        speed: 0.005 + Math.random() * 0.008,
        yBase: y,
        yFloatSpeed: 0.002 + Math.random() * 0.003
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(238, 175, 150, 1)');
    pGrad.addColorStop(0.4, 'rgba(226, 130, 159, 0.7)');
    pGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.09,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff6ed, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf2b5a0, 1.8);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffecd9, 1.2, 8);
    fillLight.position.set(0, -1, 3);
    scene.add(fillLight);

    // Initial orientation
    jarGroup.rotation.x = 0.12;
    jarGroup.rotation.y = 0.45;

    // Mouse / Touch Interactivity
    let targetRotY = 0.45;
    let targetRotX = 0.12;
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevMousePos = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0
      };
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      if (isDragging) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;
        targetRotY += deltaX * 0.012;
        targetRotX += deltaY * 0.008;
        // Clamp vertical tilt
        targetRotX = Math.max(-0.25, Math.min(0.4, targetRotX));
        prevMousePos = { x: clientX, y: clientY };
      } else {
        // Subtle tilt following pointer when hovering
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        if (normX >= -1.2 && normX <= 1.2 && normY >= -1.2 && normY <= 1.2) {
          targetRotY = 0.45 + normX * 0.45;
          targetRotX = 0.12 - normY * 0.25;
        }
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElem.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damping rotation
      if (!isDragging) {
        targetRotY += 0.003; // continuous subtle rotation
      }
      jarGroup.rotation.y += (targetRotY - jarGroup.rotation.y) * 0.06;
      jarGroup.rotation.x += (targetRotX - jarGroup.rotation.x) * 0.06;

      // Gentle floating sine wave
      jarGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.04;

      // Orbiting radiant particles
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const item = particleSpeeds[i];
        item.angle += item.speed;
        positions[i * 3] = Math.cos(item.angle) * item.radius;
        positions[i * 3 + 1] = item.yBase + Math.sin(elapsedTime * 2 + i) * 0.15;
        positions[i * 3 + 2] = Math.sin(item.angle) * item.radius;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElem.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      // Clean up WebGL resources
      renderer.dispose();
      glassGeo.dispose();
      creamGeo.dispose();
      capGeo.dispose();
      pedestalGeo.dispose();
      shadowGeo.dispose();
      particleGeo.dispose();
      glassMaterial.dispose();
      capMaterial.dispose();
      creamMaterial.dispose();
      pedestalMaterial.dispose();
      shadowMaterial.dispose();
      particleMaterial.dispose();
      shadowTexture.dispose();
      pTexture.dispose();
      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(280px, 38vw, 420px)',
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isInteracting ? 'grabbing' : 'grab',
        touchAction: 'pan-y'
      }}
      className={className}
    >
      {/* Interactive Drag Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(18, 18, 18, 0.08)',
          fontSize: '11px',
          fontWeight: 700,
          color: '#736C65',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'opacity 0.3s'
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E2829F', display: 'inline-block' }}></span>
        <span>Drag to rotate 3D jar</span>
      </div>
    </div>
  );
}
