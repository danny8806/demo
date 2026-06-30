"use client";

import { motion } from "framer-motion";

export default function GradientBorder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: "1.5px",
          background: "linear-gradient(135deg, #9A8FFA, #C6C0FC, #9A8FFA, #C6C0FC)",
          backgroundSize: "300% 300%",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        variants={{
          hover: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          },
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      {children}
    </motion.div>
  );
}
