"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import RippleButton from "./RippleButton";
import NoiseOverlay from "./NoiseOverlay";
import TextScramble from "./TextScramble";

/* ------------------------------------------------------------------ */
/*  Aurora Mesh Background (canvas, no grid)                          */
/* ------------------------------------------------------------------ */
function AuroraBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      t += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      const spots = [
        { x: 0.15, y: 0.2, r: 0.02, g: 0.71, b: 0.83, s: 0.55 },
        { x: 0.85, y: 0.15, r: 0.38, g: 0.40, b: 0.95, s: 0.45 },
        { x: 0.5, y: 0.75, r: 0.18, g: 0.83, b: 0.75, s: 0.5 },
        { x: 0.1, y: 0.8, r: 0.02, g: 0.71, b: 0.83, s: 0.35 },
        { x: 0.9, y: 0.7, r: 0.38, g: 0.40, b: 0.95, s: 0.35 },
      ];

      for (const spot of spots) {
        const cx = (spot.x + Math.sin(t * 0.4 + spot.x * 8) * 0.04) * w;
        const cy = (spot.y + Math.cos(t * 0.35 + spot.y * 8) * 0.04) * h;
        const radius = Math.max(w, h) * spot.s;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${spot.r * 255},${spot.g * 255},${spot.b * 255},0.18)`);
        grad.addColorStop(0.4, `rgba(${spot.r * 255},${spot.g * 255},${spot.b * 255},0.07)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      id = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-0" />;
}

/* ------------------------------------------------------------------ */
/*  Subtle floating particles (dots only, no lines)                   */
/* ------------------------------------------------------------------ */
function ParticleDots() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.2 + 0.04,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.a})`;
        ctx.fill();
      }
      id = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-[1]" />;
}

/* ------------------------------------------------------------------ */
/*  Radial cursor-follow glow                                         */
/* ------------------------------------------------------------------ */
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(34, 211, 238, 0.04), transparent 40%)`,
        transition: "background 0.15s ease-out",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Animated stat counter                                             */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  end,
  suffix = "",
  label,
  duration = 2,
}: {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / (duration * 60));
    const raf = () => {
      start += step;
      if (start >= end) {
        setVal(end);
        return;
      }
      setVal(start);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
        {val.toLocaleString()}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-zinc-500 mt-1">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Glassmorphism dashboard widget                                    */
/* ------------------------------------------------------------------ */
function DashboardWidget() {
  return (
    <div className="relative">
      <div className="relative w-full max-w-md mx-auto bg-white/[0.04] backdrop-blur-2xl rounded-3xl border border-white/[0.06] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <span className="text-xs text-zinc-500 font-mono">dashboard — ucodeinfotech.com</span>
          </div>
          <span className="text-[10px] text-[#22D3EE] font-mono bg-[#22D3EE]/10 px-2 py-0.5 rounded-full">
            live
          </span>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center text-white text-xs font-bold">
                U
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Deployment Pipeline</div>
                <div className="text-xs text-zinc-500">production • main</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono">99.9%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Build progress</span>
              <span className="text-white font-mono">92%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "92%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#6366F1]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["Build", "Test", "Deploy"].map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
                className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3 + i * 0.15, type: "spring" }}
                  className="w-6 h-6 mx-auto mb-1.5 rounded-full bg-[#22D3EE]/20 flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <div className="text-xs text-zinc-400 font-medium">{stage}</div>
                <div className="text-[10px] text-zinc-600 font-mono">passed</div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-zinc-500 font-medium">Analytics (last 7d)</span>
              <span className="text-[10px] text-zinc-600 font-mono">+23.5%</span>
            </div>
            <div className="flex items-end gap-2 h-16">
              {[35, 55, 42, 68, 78, 62, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.8 + i * 0.08, ease: "easeOut" }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#22D3EE]/40 to-[#22D3EE]/10 border-t border-[#22D3EE]/30"
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                <span key={d} className="text-[9px] text-zinc-600 flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="flex items-center gap-2 text-xs text-zinc-500"
          >
            <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            All systems operational · Last deployed 2m ago
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating decorative UI elements                                   */
/* ------------------------------------------------------------------ */
function FloatingElement({
  children,
  className = "",
  duration = 6,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -12, 0, 8, 0],
        x: [0, 6, -4, 8, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                      */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const parallaxBg = useTransform(scrollY, [0, 600], [0, 120]);
  const parallaxContent = useTransform(scrollY, [0, 600], [0, -40]);
  const fadeContent = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060612]"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#060612] via-[#0a0a2e] to-[#060612]"
        style={{ y: parallaxBg, scale: 1.05 }}
      />

      <AuroraBackground />
      <ParticleDots />
      <CursorGlow />
      <NoiseOverlay />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060612]/80"
        style={{ y: parallaxBg }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
        style={{ y: parallaxContent, opacity: fadeContent }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ------- Left: Content ------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.08]"
            >
              Build{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#60A5FA] to-[#6366F1] bg-clip-text text-transparent">
                <TextScramble text="Smarter" delay={1} />
              </span>
              <br />
              <span className="text-zinc-400">
                <TextScramble text="Grow Faster." delay={1.5} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-base sm:text-lg text-zinc-500 leading-relaxed max-w-lg"
            >
              From web &amp; mobile apps to ERP and digital marketing —
              we engineer solutions that drive real business growth for
              companies in Pathankot and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <RippleButton
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] text-[#060612] text-base font-bold rounded-2xl hover:shadow-lg hover:shadow-[#22D3EE]/30 hover:scale-[1.02] transition-all duration-300"
              >
                Start Your Project
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RippleButton>

              <RippleButton
                onClick={() => {
                  document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-zinc-400 border border-white/10 rounded-2xl hover:bg-white/[0.03] hover:border-white/20 hover:text-white transition-all duration-300"
              >
                View Portfolio
              </RippleButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              <AnimatedCounter end={150} suffix="+" label="Projects Delivered" />
              <AnimatedCounter end={80} suffix="+" label="Happy Clients" />
              <AnimatedCounter end={98} suffix="%" label="Client Satisfaction" />
              <AnimatedCounter end={6} suffix="+" label="Years of Experience" />
            </motion.div>
          </motion.div>

          {/* ------- Right: Dashboard + Floating Elements ------- */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="hidden lg:flex flex-col items-center relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#22D3EE]/5 via-[#6366F1]/5 to-transparent blur-[100px]" />
            <FloatingElement className="-top-8 -right-4" duration={7} delay={0}>
              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center text-white text-xs font-bold">
                    U
                  </div>
                  <div>
                    <div className="text-xs text-white font-semibold">Cloud Deploy</div>
                    <div className="text-[10px] text-green-400 font-mono">● live</div>
                  </div>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement className="-bottom-6 -left-8" duration={8} delay={1}>
              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] border-2 border-[#060612]" />
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] border-2 border-[#060612]" />
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] border-2 border-[#060612]" />
                  </div>
                  <span className="text-xs text-zinc-400">Team online</span>
                </div>
              </div>
            </FloatingElement>

            <DashboardWidget />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#services" className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors group">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
          <motion.svg
            className="w-4 h-4"
            animate={{ y: [0, 6, 0] }}
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
