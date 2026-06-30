"use client";

import { useEffect, useRef } from "react";

export default function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      t += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      const spots = [
        { x: 0.2, y: 0.3, r: 0.02, g: 0.71, b: 0.83, s: 0.4 },
        { x: 0.8, y: 0.2, r: 0.18, g: 0.83, b: 0.75, s: 0.35 },
        { x: 0.5, y: 0.7, r: 0.02, g: 0.71, b: 0.83, s: 0.45 },
        { x: 0.1, y: 0.7, r: 0.18, g: 0.83, b: 0.75, s: 0.3 },
        { x: 0.9, y: 0.6, r: 0.02, g: 0.71, b: 0.83, s: 0.3 },
      ];

      for (const spot of spots) {
        const cx = (spot.x + Math.sin(t * 0.5 + spot.x * 10) * 0.05) * w;
        const cy = (spot.y + Math.cos(t * 0.4 + spot.y * 10) * 0.05) * h;
        const radius = Math.max(w, h) * spot.s;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${spot.r * 255},${spot.g * 255},${spot.b * 255},0.3)`);
        gradient.addColorStop(0.5, `rgba(${spot.r * 255},${spot.g * 255},${spot.b * 255},0.1)`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      id = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-40"
    />
  );
}
