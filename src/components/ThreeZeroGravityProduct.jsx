import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Wind, Layers } from 'lucide-react';

export default function ThreeZeroGravityProduct({ className = "", onInteractChange }) {
  const containerRef = useRef(null);
  const [isLidFloating, setIsLidFloating] = useState(true);
  const isLidFloatingRef = useRef(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const pulseTriggerRef = useRef(0);

  useEffect(() => {
    isLidFloatingRef.current = isLidFloating;
  }, [isLidFloating]);

  const triggerPulse = () => {
    pulseTriggerRef.current = performance.now();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 4.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 2. Lighting setup for zero-gravity luxury product
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.4);
    scene.add(ambientLight);

    // Key studio light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 3.5);
    scene.add(keyLight);

    // Rose-gold rim light from behind-left
    const rimLightLeft = new THREE.DirectionalLight(0xe2829f, 3.2);
    rimLightLeft.position.set(-4, 2.5, -3);
    scene.add(rimLightLeft);

    // Golden specular light from behind-right
    const rimLightRight = new THREE.DirectionalLight(0xffd700, 2.0);
    rimLightRight.position.set(3.5, -2, -2.5);
    scene.add(rimLightRight);

    // Soft fill light from below
    const fillLight = new THREE.PointLight(0xffb6c1, 1.2, 8);
    fillLight.position.set(0, -2, 2);
    scene.add(fillLight);

    // 3. Root Zero-Gravity Group
    const zeroGravityRoot = new THREE.Group();
    scene.add(zeroGravityRoot);

    const jarGroup = new THREE.Group();
    zeroGravityRoot.add(jarGroup);

    // 4. Materials
    const textureLoader = new THREE.TextureLoader();
    const stickerTexture = textureLoader.load('/assets/hand_cream_sticker.png');
    stickerTexture.colorSpace = THREE.SRGBColorSpace;

    // Blush Pink Porcelain Material
    const pinkPorcelainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F7D0DC'),
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1
    });

    // Pure White Thread Neck
    const whiteThreadMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFFFF'),
      roughness: 0.3,
      metalness: 0.02
    });

    // Whipped Ivory Cream
    const creamMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFDF9'),
      roughness: 0.4,
      metalness: 0.02
    });

    // Metallic Rose Gold Trim Accent
    const roseGoldTrimMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E2A2B0'),
      metalness: 0.92,
      roughness: 0.16
    });

    // Sticker Label Material
    const stickerMaterial = new THREE.MeshStandardMaterial({
      map: stickerTexture,
      transparent: true,
      roughness: 0.22,
      metalness: 0.02
    });

    // 5. Build Hand & Feet Whitening Cream 3D Jar
    // Tub body
    const tubGeo = new THREE.CylinderGeometry(1.08, 1.05, 0.58, 64);
    const tubMesh = new THREE.Mesh(tubGeo, pinkPorcelainMaterial);
    tubMesh.position.y = -0.16;
    jarGroup.add(tubMesh);

    // Rounded bottom
    const tubBottomGeo = new THREE.CylinderGeometry(1.05, 0.98, 0.08, 64);
    const tubBottomMesh = new THREE.Mesh(tubBottomGeo, pinkPorcelainMaterial);
    tubBottomMesh.position.y = -0.49;
    jarGroup.add(tubBottomMesh);

    // Inner Cream
    const creamGeo = new THREE.CylinderGeometry(0.98, 0.95, 0.44, 48);
    const creamMesh = new THREE.Mesh(creamGeo, creamMaterial);
    creamMesh.position.y = -0.12;
    jarGroup.add(creamMesh);

    // Rose gold accent ring around the jar rim
    const rimTorusGeo = new THREE.TorusGeometry(1.085, 0.016, 16, 64);
    const rimTorusMesh = new THREE.Mesh(rimTorusGeo, roseGoldTrimMaterial);
    rimTorusMesh.rotation.x = Math.PI / 2;
    rimTorusMesh.position.y = 0.13;
    jarGroup.add(rimTorusMesh);

    // White screw neck
    const neckGeo = new THREE.CylinderGeometry(0.96, 0.96, 0.16, 48);
    const neckMesh = new THREE.Mesh(neckGeo, whiteThreadMaterial);
    neckMesh.position.y = 0.21;
    jarGroup.add(neckMesh);

    // Floating Zero-Gravity Lid Group
    const lidGroup = new THREE.Group();
    zeroGravityRoot.add(lidGroup);

    // Lid body
    const lidGeo = new THREE.CylinderGeometry(1.10, 1.10, 0.22, 64);
    const lidMesh = new THREE.Mesh(lidGeo, pinkPorcelainMaterial);
    lidGroup.add(lidMesh);

    // Lid sticker top
    const stickerCircleGeo = new THREE.CircleGeometry(1.02, 64);
    const stickerMesh = new THREE.Mesh(stickerCircleGeo, stickerMaterial);
    stickerMesh.rotation.x = -Math.PI / 2;
    stickerMesh.position.y = 0.112;
    lidGroup.add(stickerMesh);

    // Rose gold rim ring on the lid top
    const lidTrimGeo = new THREE.TorusGeometry(1.02, 0.015, 16, 64);
    const lidTrimMesh = new THREE.Mesh(lidTrimGeo, roseGoldTrimMaterial);
    lidTrimMesh.rotation.x = Math.PI / 2;
    lidTrimMesh.position.y = 0.113;
    lidGroup.add(lidTrimMesh);

    // Initial lid floating pose
    const floatingLidTarget = {
      y: 0.95,
      rotX: 0.28,
      rotZ: -0.18
    };

    // 6. BUILD 3D REAL ZERO-GRAVITY PARTICLES
    // A. 3D Curved Rose Petals
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, -0.4);
    petalShape.bezierCurveTo(0.32, -0.2, 0.44, 0.32, 0, 0.6);
    petalShape.bezierCurveTo(-0.44, 0.32, -0.32, -0.2, 0, -0.4);

    const petalBaseGeo = new THREE.ShapeGeometry(petalShape, 16);
    // Add organic 3D curvature to the petal
    const petalPos = petalBaseGeo.attributes.position;
    for (let i = 0; i < petalPos.count; i++) {
      const px = petalPos.getX(i);
      const py = petalPos.getY(i);
      petalPos.setZ(i, (1 - Math.cos(px * 2.8)) * 0.14 - Math.sin((py + 0.4) * 1.8) * 0.09);
    }
    petalBaseGeo.computeVertexNormals();

    const petalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F4A6BA'),
      roughness: 0.45,
      metalness: 0.04,
      side: THREE.DoubleSide
    });

    const petalMaterialAccent = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ECC1CC'),
      roughness: 0.48,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    const petalsCount = 20;
    const petalsData = [];
    const petalsGroup = new THREE.Group();
    zeroGravityRoot.add(petalsGroup);

    for (let i = 0; i < petalsCount; i++) {
      const mesh = new THREE.Mesh(
        petalBaseGeo,
        i % 2 === 0 ? petalMaterial : petalMaterialAccent
      );

      const radius = 1.9 + Math.random() * 1.6;
      const theta = (i / petalsCount) * Math.PI * 2 + Math.random() * 0.4;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      const x = radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi);
      const z = radius * Math.cos(phi) * Math.sin(theta);

      mesh.position.set(x, y, z);
      const scale = 0.38 + Math.random() * 0.28;
      mesh.scale.set(scale, scale, scale);

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      petalsGroup.add(mesh);

      petalsData.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        orbitRadius: radius,
        orbitSpeed: (0.12 + Math.random() * 0.18) * (Math.random() > 0.5 ? 1 : -1),
        theta,
        phi,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.018,
        floatFreq: 0.8 + Math.random() * 0.6,
        floatAmp: 0.12 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }

    // B. 3D Floating Water Droplets / Crystal Spheres (Physical glass transmission)
    const dropletMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFFFFF'),
      roughness: 0.05,
      transmission: 0.95,
      thickness: 0.6,
      transparent: true,
      opacity: 0.9,
      ior: 1.333,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04
    });

    const dropletsCount = 30;
    const dropletsData = [];
    const dropletsGroup = new THREE.Group();
    zeroGravityRoot.add(dropletsGroup);

    for (let i = 0; i < dropletsCount; i++) {
      const radius = 0.04 + Math.random() * 0.09;
      const sphereGeo = new THREE.SphereGeometry(radius, 24, 24);
      const mesh = new THREE.Mesh(sphereGeo, dropletMaterial);

      const dist = 1.5 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      const x = dist * Math.cos(phi) * Math.cos(theta);
      const y = dist * Math.sin(phi);
      const z = dist * Math.cos(phi) * Math.sin(theta);

      mesh.position.set(x, y, z);
      dropletsGroup.add(mesh);

      dropletsData.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        orbitSpeed: (0.1 + Math.random() * 0.15) * (Math.random() > 0.5 ? 1 : -1),
        theta,
        phi,
        dist,
        floatFreq: 0.7 + Math.random() * 0.8,
        floatAmp: 0.08 + Math.random() * 0.08,
        phase: Math.random() * Math.PI * 2
      });
    }

    // C. 3D Floating Gold Flakes / Shimmering Chips
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFD700'),
      metalness: 0.96,
      roughness: 0.12,
      side: THREE.DoubleSide
    });

    const goldFlakeCount = 24;
    const goldFlakesData = [];
    const goldFlakesGroup = new THREE.Group();
    zeroGravityRoot.add(goldFlakesGroup);

    for (let i = 0; i < goldFlakeCount; i++) {
      const flakeSize = 0.06 + Math.random() * 0.08;
      const flakeGeo = new THREE.PlaneGeometry(flakeSize, flakeSize * 0.7, 2, 2);

      // Randomize vertex heights for jagged gold flake look
      const pos = flakeGeo.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        pos.setZ(j, (Math.random() - 0.5) * 0.02);
      }
      flakeGeo.computeVertexNormals();

      const mesh = new THREE.Mesh(flakeGeo, goldMaterial);

      const dist = 1.3 + Math.random() * 1.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      const x = dist * Math.cos(phi) * Math.cos(theta);
      const y = dist * Math.sin(phi);
      const z = dist * Math.cos(phi) * Math.sin(theta);

      mesh.position.set(x, y, z);
      goldFlakesGroup.add(mesh);

      goldFlakesData.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        orbitSpeed: (0.15 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1),
        theta,
        phi,
        dist,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.05,
        rotSpeedZ: (Math.random() - 0.5) * 0.04,
        floatFreq: 1.1 + Math.random() * 0.8,
        floatAmp: 0.06 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2
      });
    }

    // D. 3D Cosmic Stardust Particle Field (Points)
    const stardustCount = 180;
    const stardustPositions = new Float32Array(stardustCount * 3);
    for (let i = 0; i < stardustCount; i++) {
      stardustPositions[i * 3] = (Math.random() - 0.5) * 8;
      stardustPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      stardustPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const stardustGeo = new THREE.BufferGeometry();
    stardustGeo.setAttribute('position', new THREE.BufferAttribute(stardustPositions, 3));

    const stardustMat = new THREE.PointsMaterial({
      color: 0xffd1dc,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const stardustMesh = new THREE.Points(stardustGeo, stardustMat);
    zeroGravityRoot.add(stardustMesh);

    // 7. Interactive Mouse / Touch Dragging State
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotY = 0.2;
    let targetRotX = 0.08;
    let currentRotY = 0.2;
    let currentRotX = 0.08;

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      if (onInteractChange) onInteractChange(true);
      prevPointerX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      prevPointerY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX === undefined || clientY === undefined) return;

      if (isDragging) {
        const deltaX = clientX - prevPointerX;
        const deltaY = clientY - prevPointerY;
        prevPointerX = clientX;
        prevPointerY = clientY;

        targetRotY += deltaX * 0.007;
        targetRotX += deltaY * 0.007;
        targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
      if (onInteractChange) onInteractChange(false);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 8. Main 60FPS Zero-Gravity Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damped smooth rotation
      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;

      // Pulse physics calculation
      let pulseBoost = 0;
      if (pulseTriggerRef.current > 0) {
        const elapsedSincePulse = (performance.now() - pulseTriggerRef.current) / 1000;
        if (elapsedSincePulse < 2.0) {
          pulseBoost = Math.sin((elapsedSincePulse / 2.0) * Math.PI) * 0.6;
        } else {
          pulseTriggerRef.current = 0;
        }
      }

      // Root zero-gravity natural drift
      if (!isDragging) {
        targetRotY += 0.0035; // Continuous elegant zero-gravity auto-rotation
      }

      zeroGravityRoot.rotation.y = currentRotY;
      zeroGravityRoot.rotation.x = currentRotX + Math.sin(time * 0.6) * 0.03;
      zeroGravityRoot.position.y = Math.sin(time * 0.8) * 0.08 + pulseBoost * 0.3;

      // Animate floating lid
      const lidShouldFloat = isLidFloatingRef.current;
      const targetLidY = lidShouldFloat ? 0.95 + pulseBoost * 0.5 : 0.28;
      const targetLidRotX = lidShouldFloat ? 0.28 : 0;
      const targetLidRotZ = lidShouldFloat ? -0.18 : 0;

      lidGroup.position.y += (targetLidY - lidGroup.position.y) * 0.08;
      lidGroup.position.y += Math.sin(time * 1.1 + 1.2) * 0.002;
      lidGroup.rotation.x += (targetLidRotX - lidGroup.rotation.x) * 0.08;
      lidGroup.rotation.z += (targetLidRotZ - lidGroup.rotation.z) * 0.08;
      lidGroup.rotation.y += 0.004;

      // Animate 3D Rose Petals
      petalsData.forEach((p) => {
        p.theta += p.orbitSpeed * delta * (1 + pulseBoost * 1.5);
        const dynamicRadius = p.orbitRadius + pulseBoost * 0.6;

        p.mesh.position.x = dynamicRadius * Math.cos(p.phi) * Math.cos(p.theta);
        p.mesh.position.z = dynamicRadius * Math.cos(p.phi) * Math.sin(p.theta);
        p.mesh.position.y =
          dynamicRadius * Math.sin(p.phi) + Math.sin(time * p.floatFreq + p.phase) * p.floatAmp;

        p.mesh.rotation.x += p.rotSpeedX;
        p.mesh.rotation.y += p.rotSpeedY;
        p.mesh.rotation.z += p.rotSpeedZ;
      });

      // Animate 3D Water Droplets
      dropletsData.forEach((d) => {
        d.theta += d.orbitSpeed * delta * (1 + pulseBoost * 1.5);
        const dynamicDist = d.dist + pulseBoost * 0.8;

        d.mesh.position.x = dynamicDist * Math.cos(d.phi) * Math.cos(d.theta);
        d.mesh.position.z = dynamicDist * Math.cos(d.phi) * Math.sin(d.theta);
        d.mesh.position.y =
          dynamicDist * Math.sin(d.phi) + Math.sin(time * d.floatFreq + d.phase) * d.floatAmp;
      });

      // Animate 3D Gold Flakes
      goldFlakesData.forEach((g) => {
        g.theta += g.orbitSpeed * delta * (1 + pulseBoost * 1.8);
        const dynamicDist = g.dist + pulseBoost * 0.7;

        g.mesh.position.x = dynamicDist * Math.cos(g.phi) * Math.cos(g.theta);
        g.mesh.position.z = dynamicDist * Math.cos(g.phi) * Math.sin(g.theta);
        g.mesh.position.y =
          dynamicDist * Math.sin(g.phi) + Math.sin(time * g.floatFreq + g.phase) * g.floatAmp;

        g.mesh.rotation.x += g.rotSpeedX;
        g.mesh.rotation.y += g.rotSpeedY;
        g.mesh.rotation.z += g.rotSpeedZ;
      });

      // Stardust slow drift
      stardustMesh.rotation.y = time * 0.02;
      stardustMesh.rotation.x = Math.sin(time * 0.03) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      tubGeo.dispose();
      tubBottomGeo.dispose();
      creamGeo.dispose();
      lidGeo.dispose();
      stickerCircleGeo.dispose();
      petalBaseGeo.dispose();
      pinkPorcelainMaterial.dispose();
      creamMaterial.dispose();
      roseGoldTrimMaterial.dispose();
      stickerMaterial.dispose();
      petalMaterial.dispose();
      petalMaterialAccent.dispose();
      dropletMaterial.dispose();
      goldMaterial.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '280px',
        cursor: 'grab',
        touchAction: 'none'
      }}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0
        }}
      />

      {/* Floating 3D Interaction Control Pills */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(14px, 2.5vw, 22px)',
          left: 'clamp(14px, 2.5vw, 28px)',
          zIndex: 25,
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        {/* Zero-G Pulse Button */}
        <button
          onClick={triggerPulse}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            border: '1px solid rgba(226, 130, 159, 0.45)',
            backdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '11.5px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 15px rgba(226, 130, 159, 0.25)'
          }}
          title="Send a zero-gravity kinetic wave through the floating particles"
        >
          <Sparkles style={{ width: '13px', height: '13px', color: '#E2829F' }} />
          <span>Zero-G Pulse 💫</span>
        </button>

        {/* Toggle Floating Lid Button */}
        <button
          onClick={() => setIsLidFloating(!isLidFloating)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '11.5px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          title="Toggle floating zero-gravity lid position"
        >
          <Wind style={{ width: '13px', height: '13px', color: '#BFE6F5' }} />
          <span>{isLidFloating ? 'Lid: Levitation Mode' : 'Lid: Closed Mode'}</span>
        </button>
      </div>

      {/* Helper drag indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(90px, 15vw, 130px)',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(18, 18, 18, 0.72)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#E8DFD8',
          padding: '4px 14px',
          borderRadius: '9999px',
          fontSize: '11px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <RotateCw style={{ width: '11px', height: '11px', color: '#E2829F' }} />
        <span>Drag 360° to rotate in 0-Gravity</span>
      </div>
    </div>
  );
}
