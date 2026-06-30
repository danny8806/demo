"use client";

import { useEffect, useRef, useState } from "react";

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
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startedRef.current = true;
      startRef.current = performance.now();
      const oldText = display;
      const newText = text;
      const len = Math.max(oldText.length, newText.length);
      let frame = 0;

      const scramble = (now: number) => {
        const elapsed = now - startRef.current;
        const progress = Math.min(elapsed / 60, 1);
        frame++;

        let out = "";
        for (let i = 0; i < len; i++) {
          const isDone = i < Math.floor(progress * len);
          if (isDone) {
            out += newText[i] || "";
          } else if (i < newText.length) {
            const r = Math.floor(Math.random() * chars.length);
            out += chars[r];
          } else {
            out += " ";
          }
        }
        setDisplay(out);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(scramble);
        }
      };

      frameRef.current = requestAnimationFrame(scramble);

      return () => cancelAnimationFrame(frameRef.current);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={className}>{display}</span>;
}
