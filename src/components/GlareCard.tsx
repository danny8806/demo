"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  glareOpacity?: number;
  disabled?: boolean;
}

export default function GlareCard({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.08)",
  glareOpacity = 0.12,
  disabled = false,
}: GlareCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glareO: 0 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setStyle({ rotateX, rotateY, glareX, glareY, glareO: glareOpacity });
    },
    [disabled, glareOpacity]
  );

  const handleLeave = useCallback(() => {
    setStyle({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glareO: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden cursor-default ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: style.rotateX,
        rotateY: style.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, ${glareColor} 0%, transparent 60%)`,
          opacity: style.glareO,
          transition: "opacity 0.3s",
        }}
      />
    </motion.div>
  );
}
