import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreePizza() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.8, 8.2);
    camera.lookAt(new THREE.Vector3(0, 0.2, 0));

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Create Pizza Group
    const pizzaGroup = new THREE.Group();
    // Tilt slightly forward by default so the user sees the toppings clearly
    pizzaGroup.rotation.x = Math.PI / 6;
    pizzaGroup.position.y = 0.2; // Lift slightly to center in viewport
    scene.add(pizzaGroup);

    // Material definitions
    const crustMaterial = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.7 }); // Wheat color crust
    const cheeseMaterial = new THREE.MeshStandardMaterial({ color: 0xffe4b5, roughness: 0.5, metalness: 0.05 }); // Pale yellow cheese
    const pepMaterial = new THREE.MeshStandardMaterial({ color: 0x800000, roughness: 0.6 }); // Deep red pepperoni
    const basilMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.7 }); // Leafy green basil

    // Build Pizza Layers
    
    // Outer Crust Ring (Torus)
    const crustGeom = new THREE.TorusGeometry(1.8, 0.16, 16, 64);
    const crust = new THREE.Mesh(crustGeom, crustMaterial);
    crust.rotation.x = Math.PI / 2; // Flat on plane
    crust.castShadow = true;
    crust.receiveShadow = true;
    pizzaGroup.add(crust);

    // Inside Base (Cylinder)
    const baseGeom = new THREE.CylinderGeometry(1.8, 1.8, 0.08, 32);
    const base = new THREE.Mesh(baseGeom, crustMaterial);
    base.position.y = -0.06;
    pizzaGroup.add(base);

    // Melting Cheese Surface
    const cheeseGeom = new THREE.CylinderGeometry(1.7, 1.7, 0.06, 32);
    const cheese = new THREE.Mesh(cheeseGeom, cheeseMaterial);
    cheese.position.y = -0.02;
    cheese.receiveShadow = true;
    pizzaGroup.add(cheese);

    // Pepperoni Slices (distributed radially)
    const pepGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 16);
    const pepPositions = [
      { r: 0.6, a: 0 },
      { r: 0.9, a: Math.PI / 3 },
      { r: 1.1, a: Math.PI * 0.7 },
      { r: 0.7, a: Math.PI * 1.1 },
      { r: 1.0, a: Math.PI * 1.4 },
      { r: 1.1, a: Math.PI * 1.8 },
      { r: 0.0, a: 0 } // Center pepperoni
    ];

    pepPositions.forEach((pos, idx) => {
      const pepperoni = new THREE.Mesh(pepGeom, pepMaterial);
      pepperoni.position.x = pos.r * Math.cos(pos.a);
      pepperoni.position.z = pos.r * Math.sin(pos.a);
      pepperoni.position.y = 0.03;
      pepperoni.rotation.y = Math.random() * Math.PI; // Random rotation angle
      pepperoni.castShadow = true;
      pizzaGroup.add(pepperoni);
    });

    // Basil Leaves (distributing small squeezed spheres)
    const basilGeom = new THREE.SphereGeometry(0.12, 8, 8);
    basilGeom.scale(1.5, 0.2, 0.8); // Squeeze it to shape like a leaf
    const basilPositions = [
      { r: 0.4, a: Math.PI / 4 },
      { r: 0.8, a: Math.PI * 0.5 },
      { r: 0.9, a: Math.PI * 1.0 },
      { r: 0.5, a: Math.PI * 1.5 },
      { r: 1.2, a: Math.PI * 1.6 }
    ];

    basilPositions.forEach((pos, idx) => {
      const leaf = new THREE.Mesh(basilGeom, basilMaterial);
      leaf.position.x = pos.r * Math.cos(pos.a);
      leaf.position.z = pos.r * Math.sin(pos.a);
      leaf.position.y = 0.04;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.x = 0.1; // Tilts slightly
      leaf.castShadow = true;
      pizzaGroup.add(leaf);
    });

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Warm red glow pointlight
    const pointLight = new THREE.PointLight(0xc8a46b, 1.5, 10);
    pointLight.position.set(3, -2, -3);
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
        pizzaGroup.rotation.y += deltaMove.x * 0.007;
        pizzaGroup.rotation.x += deltaMove.y * 0.007;
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
      pizzaGroup.rotation.y += deltaMove.x * 0.007;
      pizzaGroup.rotation.x += deltaMove.y * 0.007;
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
        pizzaGroup.rotation.y += 0.008;
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
