import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBurger() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.2, 7.8);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Create Burger Group
    const burgerGroup = new THREE.Group();
    scene.add(burgerGroup);

    // Material definitions
    const bunMaterial = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.6 }); // Golden brown bun
    const pattyMaterial = new THREE.MeshStandardMaterial({ color: 0x4a2c2a, roughness: 0.8 }); // Dark meat
    const cheeseMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.5, metalness: 0.1 }); // Melted cheese
    const lettuceMaterial = new THREE.MeshStandardMaterial({ color: 0x556b2f, roughness: 0.7 }); // Lettuce green

    // Build Burger Layers (Mathematically Centered at Y = 0)
    
    // Bottom Bun
    const bottomBunGeom = new THREE.CylinderGeometry(1.6, 1.6, 0.4, 32);
    const bottomBun = new THREE.Mesh(bottomBunGeom, bunMaterial);
    bottomBun.position.y = -1.275;
    bottomBun.castShadow = true;
    bottomBun.receiveShadow = true;
    burgerGroup.add(bottomBun);

    // Patty
    const pattyGeom = new THREE.CylinderGeometry(1.65, 1.65, 0.5, 32);
    const patty = new THREE.Mesh(pattyGeom, pattyMaterial);
    patty.position.y = -0.775;
    patty.castShadow = true;
    burgerGroup.add(patty);

    // Melting Cheese Box
    const cheeseGeom = new THREE.BoxGeometry(3.2, 0.05, 3.2);
    const cheese = new THREE.Mesh(cheeseGeom, cheeseMaterial);
    cheese.position.y = -0.475;
    cheese.rotation.y = Math.PI / 6; // Angle it
    cheese.castShadow = true;
    burgerGroup.add(cheese);

    // Lettuce Flappy Leaf
    const lettuceGeom = new THREE.CylinderGeometry(1.75, 1.75, 0.1, 32);
    const lettuce = new THREE.Mesh(lettuceGeom, lettuceMaterial);
    lettuce.position.y = -0.275;
    lettuce.rotation.z = 0.05; // Slightly offset
    lettuce.castShadow = true;
    burgerGroup.add(lettuce);

    // Top Bun (Hemisphere)
    const topBunGeom = new THREE.SphereGeometry(1.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const topBun = new THREE.Mesh(topBunGeom, bunMaterial);
    topBun.position.y = -0.225;
    topBun.castShadow = true;
    burgerGroup.add(topBun);

    // Sesame Seeds on Top Bun
    const sesameMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const sesameGeom = new THREE.SphereGeometry(0.04, 8, 8);
    for (let i = 0; i < 24; i++) {
      const seed = new THREE.Mesh(sesameGeom, sesameMaterial);
      // Place randomly on hemisphere surface
      const phi = Math.random() * (Math.PI / 2.2);
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.71; // Slightly wider than bun
      
      seed.position.x = radius * Math.sin(phi) * Math.cos(theta);
      seed.position.z = radius * Math.sin(phi) * Math.sin(theta);
      seed.position.y = radius * Math.cos(phi) - 0.225;
      
      seed.rotation.x = phi;
      seed.rotation.y = theta;
      burgerGroup.add(seed);
    }

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Gold Spotlight glow
    const pointLight = new THREE.PointLight(0xc8a46b, 1.5, 10);
    pointLight.position.set(-3, -2, 3);
    scene.add(pointLight);

    // 6. Interactive Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = () => { isDragging = true; };
    const handleMouseMove = (e) => {
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };

      if (isDragging) {
        burgerGroup.rotation.y += deltaMove.x * 0.007;
        burgerGroup.rotation.x += deltaMove.y * 0.007;
      }

      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    };
    const handleMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support
    const handleTouchStart = (e) => {
      isDragging = true;
      if (e.touches[0]) {
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };
    const handleTouchMove = (e) => {
      if (!isDragging || !e.touches[0]) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };
      burgerGroup.rotation.y += deltaMove.x * 0.007;
      burgerGroup.rotation.x += deltaMove.y * 0.007;
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // 7. Resize handling
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation when not dragging
      if (!isDragging) {
        burgerGroup.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[300px] sm:h-[400px] cursor-grab active:cursor-grabbing"
    />
  );
}
