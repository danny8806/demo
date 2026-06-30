"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import RippleButton from "./RippleButton";
import LiquidBlob from "./LiquidBlob";
import MeshGradient from "./MeshGradient";
import InteractiveTerminal from "./InteractiveTerminal";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 2.5 + 0.5,
        a: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(154, 143, 250, ${p.a})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(154, 143, 250, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setDone(true);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="text-[#9A8FFA] animate-pulse">|</span>}
    </span>
  );
}

function FloatingOrb({ className, size, color, delay }: { className?: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 20, -10, 15, 0],
        scale: [1, 1.05, 0.95, 1.02, 1],
      }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}40, transparent)`,
          boxShadow: `0 0 ${size}px ${color}20`,
        }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 200]);
  const parallaxContentY = useTransform(scrollY, [0, 800], [0, -60]);
  const parallaxOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
     <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden snap-start">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1040] to-[#0a0a1a]"
        style={{ y: parallaxY, scale: 1.1 }}
      />
      <MeshGradient />
      <motion.div className="absolute inset-0 hero-grid opacity-30" style={{ y: parallaxY }} />

      <ParticleField />

      <LiquidBlob color="#9A8FFA" size={500} className="top-1/3 -right-40 opacity-30" speed={15} />
      <LiquidBlob color="#C6C0FC" size={400} className="bottom-1/3 -left-40 opacity-25" speed={12} delay={3} />
      <FloatingOrb size={400} color="#9A8FFA" delay={0} className="top-20 -right-20" />
      <FloatingOrb size={300} color="#C6C0FC" delay={2} className="bottom-40 -left-20" />
      <FloatingOrb size={200} color="#9A8FFA" delay={4} className="top-1/3 left-1/4" />

      <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a]/80" style={{ y: parallaxY }} />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full"
        style={{ y: parallaxContentY, opacity: parallaxOpacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
            >
              Smart Solutions,{" "}
              <br />
              <span className="text-[#9A8FFA]">
                <TypewriterText text="Real Results" className="inline" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl"
            >
              At Ucode Infotech, we craft powerful digital solutions that help businesses grow smarter and faster. From responsive websites and mobile apps to ERP systems and digital marketing services in Pathankot, Punjab — we turn your ideas into success stories.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton strength={0.2}>
                <RippleButton
                  onClick={() => {
                    const el = document.getElementById("contact");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[#0a0a1a] bg-gradient-to-r from-[#9A8FFA] to-[#C6C0FC] rounded-2xl hover:shadow-2xl hover:shadow-[#9A8FFA]/40 transition-all duration-300 hover:scale-105"
                >
                  Internship
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </RippleButton>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <RippleButton
                  onClick={() => {
                    const el = document.getElementById("services");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-zinc-300 border border-white/20 rounded-2xl hover:bg-white/5 hover:border-white/40 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Explore Services
                  <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </RippleButton>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-12 flex items-center gap-8 text-sm text-zinc-500"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    className="w-9 h-9 rounded-full border-2 border-[#0a0a1a] bg-gradient-to-br from-zinc-400 to-zinc-600 overflow-hidden"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-zinc-300 to-zinc-500 opacity-80" />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  className="w-9 h-9 rounded-full border-2 border-[#0a0a1a] bg-[#9A8FFA] flex items-center justify-center text-xs font-bold text-[#0a0a1a]"
                >
                  100+
                </motion.div>
              </div>
              <span>Trusted by clients in Pathankot & beyond</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex justify-center"
          >
            <div
              className="relative w-full max-w-lg"
              style={{
                transform: typeof window !== "undefined"
                  ? `perspective(1000px) rotateY(${(mousePos.x / window.innerWidth - 0.5) * 6}deg) rotateX(${(-mousePos.y / window.innerHeight + 0.5) * 6}deg)`
                  : "none",
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="floating-shape absolute -top-8 -left-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#9A8FFA]/20 to-[#C6C0FC]/20 border border-white/10" />
              <div className="floating-shape absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-[#C6C0FC]/10 to-[#9A8FFA]/10 border border-white/10" style={{ animationDelay: "-2s" }} />

              <InteractiveTerminal />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#services" className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors group">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.svg
            className="w-5 h-5"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </a>
      </motion.div>
    </section>
  );
}
