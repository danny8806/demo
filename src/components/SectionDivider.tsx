"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  flip?: boolean;
}

export default function SectionDivider({ flip }: SectionDividerProps) {
  return (
    <div className="relative w-full h-24 sm:h-32 overflow-hidden -mt-1">
      <motion.div
        initial={{ opacity: 0, scaleY: 0.5 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ transformOrigin: flip ? "top" : "bottom" }}
      >
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={flip ? { transform: "rotateX(180deg)" } : undefined}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M0,100 C320,200 520,0 720,100 C920,200 1120,0 1440,100 L1440,200 L0,200 Z"
            fill="url(#divider-gradient)"
          />
          <defs>
            <linearGradient
              id="divider-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
