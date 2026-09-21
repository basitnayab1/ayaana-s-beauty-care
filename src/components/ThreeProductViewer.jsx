import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles } from 'lucide-react';

export default function ThreeProductViewer({ productName = "Radiance Cream", className = "" }) {
  const containerRef = useRef(null);
  const [isCapOpen, setIsCapOpen] = useState(false);
  const isCapOpenRef = useRef(isCapOpen);
  const capMeshRef = useRef(null);

  useEffect(() => {
    isCapOpenRef.current = isCapOpen;
  }, [isCapOpen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 3.7);

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

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const isMask = (productName || '').toLowerCase().includes('mask');
    let lidTexture = null;
    let bodyTexture = null;

    // Build 3D meshes according to product category
    if (isMask) {
      // --- NATURAL GLOW MASK (Pure Porcelain Tub with Authentic Branded Lid & Body Labels) ---
      const porcelainMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FFFFFF'),
        roughness: 0.22,
        metalness: 0.04,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15
      });

      const goldTrimMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4AF37'),
        metalness: 0.95,
        roughness: 0.18
      });

      // Rose Clay whipped cream inside
      const clayMaskMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FBE7E0'),
        roughness: 0.45,
        metalness: 0.02
      });

      // Load authentic high-resolution textures
      const textureLoader = new THREE.TextureLoader();
      lidTexture = textureLoader.load('/assets/natural_glow_mask_lid_texture.png');
      lidTexture.colorSpace = THREE.SRGBColorSpace;
      lidTexture.center.set(0.5, 0.5);
      lidTexture.rotation = Math.PI; // Align upright facing viewer

      bodyTexture = textureLoader.load('/assets/natural_glow_mask_body_texture.png');
      bodyTexture.colorSpace = THREE.SRGBColorSpace;

      // Mask Tub Body with Front Branded Decal
      const tubSideMaterial = new THREE.MeshStandardMaterial({
        map: bodyTexture,
        roughness: 0.22,
        metalness: 0.04
      });
      const tubMaterials = [tubSideMaterial, porcelainMaterial, porcelainMaterial];
      const tubGeo = new THREE.CylinderGeometry(1.08, 1.05, 0.88, 64);
      const tubMesh = new THREE.Mesh(tubGeo, tubMaterials);
      tubMesh.position.y = -0.22;
      tubMesh.rotation.y = Math.PI; // Face the front label directly forward!
      modelGroup.add(tubMesh);

      // Whipped Mask Clay Cream (visible when lid opens)
      const creamGeo = new THREE.CylinderGeometry(0.98, 0.96, 0.76, 48);
      const creamMesh = new THREE.Mesh(creamGeo, clayMaskMaterial);
      creamMesh.position.y = -0.21;
      modelGroup.add(creamMesh);

      // Subtle Whipped swirl dome on top of cream
      const swirlGeo = new THREE.SphereGeometry(0.96, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.2);
      const swirlMesh = new THREE.Mesh(swirlGeo, clayMaskMaterial);
      swirlMesh.position.y = 0.16;
      swirlMesh.rotation.x = Math.PI;
      modelGroup.add(swirlMesh);

      // Gold Trim Ring under lid
      const ringGeo = new THREE.TorusGeometry(1.06, 0.016, 16, 64);
      const ringMesh = new THREE.Mesh(ringGeo, goldTrimMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.23;
      modelGroup.add(ringMesh);

      // Lid Group
      const capGroup = new THREE.Group();
      modelGroup.add(capGroup);
      capMeshRef.current = capGroup;

      // Lid Side & Top (Cylinder materials: [side, top, bottom])
      const lidTopMaterial = new THREE.MeshStandardMaterial({
        map: lidTexture,
        roughness: 0.22,
        metalness: 0.04
      });

      const lidGeo = new THREE.CylinderGeometry(1.09, 1.09, 0.38, 64);
      const lidMaterials = [porcelainMaterial, lidTopMaterial, porcelainMaterial];
      const lidMesh = new THREE.Mesh(lidGeo, lidMaterials);
      lidMesh.position.y = 0.44;
      capGroup.add(lidMesh);

      // Gold accent ring on lid rim
      const lidRingGeo = new THREE.TorusGeometry(1.09, 0.014, 16, 64);
      const lidRingMesh = new THREE.Mesh(lidRingGeo, goldTrimMaterial);
      lidRingMesh.rotation.x = Math.PI / 2;
      lidRingMesh.position.y = 0.63;
      capGroup.add(lidRingMesh);

    } else {
      // --- LUXURY GLASS JAR (For Radiance Creams & Serums) ---
      const capMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E6A895'),
        metalness: 0.9,
        roughness: 0.2
      });

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FCFAF6'),
        metalness: 0.05,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 1.2,
        ior: 1.52,
        transparent: true,
        opacity: 0.9
      });

      const creamMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFFDF9'),
        roughness: 0.4,
        metalness: 0.02
      });

      const goldRingMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ECC79B'),
        metalness: 0.95,
        roughness: 0.15
      });

      const glassGeo = new THREE.CylinderGeometry(0.92, 0.9, 0.85, 48);
      const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
      glassMesh.position.y = -0.2;
      modelGroup.add(glassMesh);

      const creamGeo = new THREE.CylinderGeometry(0.84, 0.82, 0.74, 36);
      const creamMesh = new THREE.Mesh(creamGeo, creamMaterial);
      creamMesh.position.y = -0.21;
      modelGroup.add(creamMesh);

      const ringGeo = new THREE.TorusGeometry(0.9, 0.02, 16, 48);
      const ringMesh = new THREE.Mesh(ringGeo, goldRingMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.23;
      modelGroup.add(ringMesh);

      const capGroup = new THREE.Group();
      modelGroup.add(capGroup);
      capMeshRef.current = capGroup;

      const capGeo = new THREE.CylinderGeometry(0.93, 0.93, 0.46, 48);
      const capMesh = new THREE.Mesh(capGeo, capMaterial);
      capMesh.position.y = 0.48;
      capGroup.add(capMesh);

      const capBevelGeo = new THREE.CylinderGeometry(0.91, 0.93, 0.04, 48);
      const capBevelMesh = new THREE.Mesh(capBevelGeo, capMaterial);
      capBevelMesh.position.y = 0.72;
      capGroup.add(capBevelMesh);
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8f2, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(3.5, 4.5, 3.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf7d9cc, 1.6);
    fillLight.position.set(-3.5, 2.5, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, -3, 3);
    scene.add(rimLight);

    // Initial slight angle to showcase the branded lid label
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let targetRotY = 0.4;
    let targetRotX = isMask ? 0.38 : 0.15;

    const onMouseDown = (e) => {
      isDragging = true;
      const touch = e.touches && e.touches[0];
      prevMouse = {
        x: touch ? touch.clientX : (e.clientX ?? 0),
        y: touch ? touch.clientY : (e.clientY ?? 0)
      };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches && e.touches[0];
      const clientX = touch ? touch.clientX : (e.clientX ?? 0);
      const clientY = touch ? touch.clientY : (e.clientY ?? 0);
      const dx = clientX - prevMouse.x;
      const dy = clientY - prevMouse.y;
      targetRotY += dx * 0.015;
      targetRotX += dy * 0.01;
      targetRotX = Math.max(-0.4, Math.min(0.85, targetRotX));
      prevMouse = { x: clientX, y: clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    dom.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        targetRotY += 0.0025;
      }

      modelGroup.rotation.y += (targetRotY - modelGroup.rotation.y) * 0.08;
      modelGroup.rotation.x += (targetRotX - modelGroup.rotation.x) * 0.08;

      // Smooth lid open/closed position using ref
      if (capMeshRef.current) {
        const targetCapY = isCapOpenRef.current ? 0.85 : 0;
        const targetCapRotZ = isCapOpenRef.current ? 0.28 : 0;
        capMeshRef.current.position.y += (targetCapY - capMeshRef.current.position.y) * 0.1;
        capMeshRef.current.rotation.z += (targetCapRotZ - capMeshRef.current.rotation.z) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      if (lidTexture) lidTexture.dispose();
      if (bodyTexture) bodyTexture.dispose();
      renderer.dispose();
      if (container.contains(dom)) container.removeChild(dom);
    };
  }, [productName]);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }} className={className}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 'clamp(260px, 34vw, 320px)',
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'pan-y'
        }}
      />

      {/* 3D Control Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(18, 18, 18, 0.08)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          fontSize: '11.5px',
          color: '#2E2B28',
          zIndex: 5,
          whiteSpace: 'nowrap'
        }}
      >
        <button
          onClick={() => setIsCapOpen(!isCapOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '9999px',
            backgroundColor: '#FDFBF7',
            border: '1px solid rgba(226, 130, 159, 0.35)',
            fontWeight: 700,
            fontSize: '11px',
            color: '#121212',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          <Sparkles style={{ width: '13px', height: '13px', color: '#C75678' }} />
          <span>{isCapOpen ? "Close Lid" : "Open Lid (Inspect Cream)"}</span>
        </button>
        <span style={{ color: 'rgba(18, 18, 18, 0.2)' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#736C65' }}>
          <RotateCw style={{ width: '12px', height: '12px', color: '#9B948C' }} />
          <span>360° Drag</span>
        </div>
      </div>
    </div>
  );
}
