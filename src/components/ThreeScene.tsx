"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x9A8FFA,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.15,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1.8, 1.8, 1.8);
    scene.add(mesh);

    const wireframeMat = new THREE.MeshPhysicalMaterial({
      color: 0xC6C0FC,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMat);
    wireframe.scale.set(1.8, 1.8, 1.8);
    scene.add(wireframe);

    const particlesGeo = new THREE.BufferGeometry();
    const count = 400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x9A8FFA,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse);

    let id: number;
    const animate = () => {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.01;
      wireframe.rotation.x += 0.005;
      wireframe.rotation.y += 0.01;
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      mesh.position.x += (mouseX * 0.3 - mesh.position.x) * 0.02;
      mesh.position.y += (mouseY * 0.3 - mesh.position.y) * 0.02;
      wireframe.position.copy(mesh.position);

      renderer.render(scene, camera);
      id = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      wireframeMat.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
