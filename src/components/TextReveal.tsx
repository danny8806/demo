"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  delay?: number;
  mode?: "words" | "chars";
}

export default function TextReveal({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  mode = "words",
}: TextRevealProps) {
  const parts = mode === "words" ? text.split(" ") : text.split("");

  return (
    <Tag className={className} style={{ display: "inline", flexWrap: "wrap" }}>
      {parts.map((part, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.175, 0.885, 0.32, 1],
            }}
            className="inline-block"
            style={{ whiteSpace: mode === "words" ? "nowrap" : undefined }}
          >
            {part}
            {mode === "words" && i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
