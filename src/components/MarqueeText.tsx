"use client";

import { motion } from "framer-motion";

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}

export default function MarqueeText({
  text,
  className = "",
  speed = 25,
  direction = "left",
}: MarqueeTextProps) {
  const duplicated = Array.from({ length: 4 }).fill(text).join(" \u2022 ");

  return (
    <div className={`relative overflow-hidden whitespace-nowrap ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-transparent to-[#0a0a1a] z-10 pointer-events-none" />
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="inline-flex gap-8"
      >
        <span className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter opacity-5 text-white">
          {duplicated}
        </span>
        <span className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter opacity-5 text-white">
          {duplicated}
        </span>
      </motion.div>
    </div>
  );
}
