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

    const colors = [
      [154 / 255, 143 / 255, 250 / 255],
      [198 / 255, 192 / 255, 252 / 255],
      [139 / 255, 127 / 255, 242 / 255],
      [100 / 255, 90 / 255, 200 / 255],
    ];

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

      for (let y = 0; y < h; y += 40) {
        for (let x = 0; x < w; x += 40) {
          const nx = x / w;
          const ny = y / h;
          const dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2) * 2;

          const r =
            Math.sin(nx * 8 + t) * 0.3 +
            Math.sin(ny * 6 - t * 0.7) * 0.2 +
            0.5;
          const g =
            Math.sin(nx * 6 - t * 0.5 + 1) * 0.3 +
            Math.sin(ny * 8 + t * 0.8 + 2) * 0.2 +
            0.5;
          const b =
            Math.sin(nx * 7 + t * 0.6 + 3) * 0.3 +
            Math.sin(ny * 5 - t * 0.9 + 1) * 0.2 +
            0.5;

          const alpha = Math.max(0, 0.06 * (1 - dist * 0.3));

          ctx.fillStyle = `rgba(${r * 255},${g * 255},${b * 255},${alpha})`;
          ctx.fillRect(x, y, 42, 42);
        }
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
