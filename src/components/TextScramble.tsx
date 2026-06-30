"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const chars = "!<>-_\\/[]{}—=+*^?#________";

export default function TextScramble({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let id: number;
    const timeout = setTimeout(() => {
      const n = text.length;
      let frame = 0;
      const totalFrames = 40;

      const animate = () => {
        if (!mounted.current) return;
        frame++;
        let out = "";
        for (let i = 0; i < n; i++) {
          if (frame >= totalFrames || i < (frame / totalFrames) * n) {
            out += text[i];
          } else {
            out += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayed(out);
        if (frame < totalFrames + 10) {
          id = requestAnimationFrame(animate);
        } else {
          setDisplayed(text);
          setDone(true);
        }
      };
      animate();
    }, delay * 1000);

    return () => {
      mounted.current = false;
      clearTimeout(timeout);
      cancelAnimationFrame(id);
    };
  }, [text, delay]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
}
