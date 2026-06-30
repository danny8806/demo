"use client";

import { useEffect, useState, useCallback } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  const update = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", update);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", update);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [update]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(154, 143, 250, 0.12) 0%, transparent 60%)",
          transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)`,
          transition: "transform 0.08s linear",
        }}
      />
      <div
        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at center, rgba(198, 192, 252, 0.08) 0%, transparent 60%)",
          transform: `translate(${pos.x - 100}px, ${pos.y - 100}px)`,
          transition: "transform 0.05s linear",
        }}
      />
    </div>
  );
}
