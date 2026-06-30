"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 h-48 sm:h-64 hidden lg:block">
      <div className="relative w-[3px] h-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#9A8FFA] to-[#C6C0FC] rounded-full"
          style={{ scaleY: smoothProgress, transformOrigin: "top" }}
        />
      </div>
      <motion.div
        className="absolute -left-[5px] w-[13px] h-[13px] rounded-full border-2 border-[#9A8FFA] bg-[#0a0a1a] shadow-lg shadow-[#9A8FFA]/30"
        style={{ top: smoothProgress, translateY: "-50%" }}
      />
    </div>
  );
}
