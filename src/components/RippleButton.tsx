"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function RippleButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = idRef.current++;
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
      onClick?.();
    },
    [onClick]
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{
              left: ripple.x - 12,
              top: ripple.y - 12,
              width: 24,
              height: 24,
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
