"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LiquidBlobProps {
  className?: string;
  color?: string;
  size?: number;
  speed?: number;
  delay?: number;
}

export default function LiquidBlob({
  className = "",
  color = "#9A8FFA",
  size = 300,
  speed = 12,
  delay = 0,
}: LiquidBlobProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = performance.now();
    let id: number;

    const animate = (now: number) => {
      const t = ((now - start) / 1000) * speed + delay;
      const x = Math.sin(t * 0.7) * 30 + Math.cos(t * 0.3) * 15;
      const y = Math.cos(t * 0.5) * 25 + Math.sin(t * 0.4) * 15;
      const sx = 1 + Math.sin(t * 0.6) * 0.08 + Math.cos(t * 0.2) * 0.05;
      const sy = 1 + Math.cos(t * 0.5) * 0.08 + Math.sin(t * 0.3) * 0.05;
      el.style.transform = `translate(${x}px, ${y}px) scale(${sx}, ${sy})`;
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [speed, delay]);

  return (
    <motion.div
      ref={ref}
      className={`absolute rounded-full blur-3xl ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 0.15, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40, ${color}10, transparent)`,
        willChange: "transform",
      }}
    />
  );
}
