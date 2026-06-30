"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Cloud, Smartphone, Layers, UserCheck, Star, Timer, Grid, ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Aurora + Light Trails Background                                  */
/* ------------------------------------------------------------------ */
function AuroraCanvas() {
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
      t += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      const trailCount = 5;
      for (let ti = 0; ti < trailCount; ti++) {
        const phase = ti * 1.4;
        const offsetY = Math.sin(t * 0.4 + phase) * 50;
        const offsetX = Math.cos(t * 0.35 + phase) * 35;
        const baseX = w * (0.08 + ti * 0.21);
        const baseY = h * (0.15 + ti * 0.04);
        const span = 250 + ti * 80;

        ctx.beginPath();
        ctx.moveTo(baseX + offsetX, baseY + offsetY);
        ctx.bezierCurveTo(
          baseX + span * 0.25 + offsetX, baseY - 100 + offsetY * 1.2,
          baseX + span * 0.55 + offsetX, baseY + 120 + offsetY * 0.8,
          baseX + span * 0.85 + offsetX, baseY + offsetY * 0.3,
        );

        const alpha = 0.03 + Math.sin(t * 0.5 + phase) * 0.03;
        const grad = ctx.createLinearGradient(baseX, baseY, baseX + span * 0.85, baseY);
        grad.addColorStop(0, `rgba(0, 216, 255, ${alpha})`);
        grad.addColorStop(0.5, `rgba(63, 143, 255, ${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(139, 91, 246, ${alpha * 0.4})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
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
/*  Particles                                                         */
/* ------------------------------------------------------------------ */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    const count = Math.min(40, Math.floor((window.innerWidth * window.innerHeight) / 30000));
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.04,
      r: Math.random() * 2.2 + 0.3,
      a: Math.random() * 0.20 + 0.03,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
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
/*  Cursor Glow                                                       */
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
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(47, 123, 255, 0.04), transparent 50%)`,
        transition: "background 0.15s ease-out",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Metric Block                                                      */
/* ------------------------------------------------------------------ */
function MetricBlock({ icon, end, suffix, label }: { icon: React.ReactNode; end: string; suffix: string; label: string }) {
  return (
    <div className="metric-block" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div className="metric-icon-box" style={{ width: "56px", height: "56px", background: "rgba(18,24,56,0.72)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B5CF6", fontSize: "24px" }}>
        {icon}
      </div>
      <div>
        <div className="metric-val" style={{ fontSize: "26px", fontWeight: 700, lineHeight: 1.2, color: "#FFFFFF" }}>{end}{suffix}</div>
        <div className="metric-lbl" style={{ color: "#AEB8D5", fontSize: "13px", whiteSpace: "nowrap", marginTop: "3px" }}>{label}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                      */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const { scrollY } = useScroll();
  const parallaxBg = useTransform(scrollY, [0, 600], [0, 100]);
  const fadeContent = useTransform(scrollY, [0, 500], [1, 0.3]);

  const brands = [
    { name: "TATA", className: "font-serif font-[900] italic" },
    { name: "Capgemini", className: "" },
    { name: "MRF", className: "font-[900] italic tracking-[-1.5px]" },
    { name: "oppo", className: "" },
    { name: "IndiGo", className: "font-[400]" },
    { name: "Radisson", className: "" },
  ];

  return (
    <>
      <section id="home" className="relative overflow-x-hidden bg-[#050816] pt-[96px]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0D1438] to-[#050816]"
          style={{ y: parallaxBg, scale: 1.05 }}
        />

        <div className="absolute pointer-events-none z-[1]" style={{
          width: "900px",
          height: "700px",
          top: "-15%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)"
        }} />

        <div className="absolute w-[500px] h-[150px] border-2 border-[rgba(0,217,255,0.15)] rounded-full bottom-[15%] right-[10%] -rotate-[15deg] shadow-[0_0_40px_rgba(0,217,255,0.06)] pointer-events-none z-[1]" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.035]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />

        <AuroraCanvas />
        <Particles />
        <CursorGlow />

        <div className="absolute inset-0 pointer-events-none z-[2]" style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(5,8,22,0.85) 100%)",
        }} />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]/85 pointer-events-none z-[2]"
          style={{ y: parallaxBg }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#050816] pointer-events-none z-[3]" />

        <motion.div
          className="relative z-10 w-full"
          style={{ opacity: fadeContent }}
        >
          <div className="mx-auto" style={{ maxWidth: "1440px", padding: "90px 32px 0" }}>
          <div className="hero-layout" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px", alignItems: "start" }}>

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="hero-left-content" style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="badge-excellence"
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(18,24,56,0.72)", border: "1px solid rgba(139,92,246,0.25)", width: "fit-content", padding: "8px 18px", borderRadius: "20px", fontSize: "13px", color: "#A78BFA", marginBottom: "20px", fontWeight: 500 }}
              >
                <span>🚀 Building Digital Excellence</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.25, duration: 0.6 }}
                style={{ fontSize: "100px", lineHeight: 0.88, fontWeight: 900, letterSpacing: "-3px", marginBottom: "20px", maxWidth: "620px" }}
              >
                <span style={{ color: "#ffffff" }}>Smart</span> <span style={{ color: "#AEB8D5" }}>Solutions,</span><br /><span style={{ background: "linear-gradient(135deg, #00D2FF 20%, #9D4EDD 85%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Real Results.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="hero-description"
                style={{ color: "rgba(208,215,232,0.95)", fontSize: "20px", lineHeight: 1.7, maxWidth: "520px", marginBottom: "35px" }}
              >
                We build high-performance websites, mobile apps, ERP systems, and digital marketing strategies that help businesses grow faster, smarter and beyond expectations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="action-buttons"
                style={{ display: "flex", gap: "20px", marginBottom: "35px" }}
              >
                <motion.button
                  whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(37,99,235,0.40)" }}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-blue-gradient"
                  style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "white", border: "none", padding: "0 36px", height: "64px", borderRadius: "12px", fontWeight: 600, fontSize: "15px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", boxShadow: "0 8px 24px rgba(37,99,235,0.30)" }}
                >
                  Start Your Project <ArrowRight style={{ width: "18px", height: "18px" }} />
                </motion.button>
                <motion.button
                  whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.20)" }}
                  onClick={() => document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-outline-dark"
                  style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.12)", padding: "0 36px", height: "64px", borderRadius: "12px", fontWeight: 600, fontSize: "15px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                >
                  View Our Work <Play style={{ width: "16px", height: "16px" }} />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="metrics-grid"
                style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", gap: "40px" }}
              >
                <MetricBlock icon={<Layers style={{ width: "26px", height: "26px" }} />} end="150" suffix="+" label="Projects Delivered" />
                <MetricBlock icon={<UserCheck style={{ width: "26px", height: "26px" }} />} end="50" suffix="+" label="Happy Clients" />
                <MetricBlock icon={<Star style={{ width: "26px", height: "26px" }} />} end="98" suffix="%" label="Client Satisfaction" />
                <MetricBlock icon={<Timer style={{ width: "26px", height: "26px" }} />} end="5" suffix="+" label="Years Experience" />
              </motion.div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="hero-right-visuals"
              style={{ position: "relative", width: "100%", height: "600px", perspective: "1200px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {/* Platform glow */}
              <motion.div
                animate={{ opacity: [0.92, 1, 0.92] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", width: "900px", height: "700px", borderRadius: "50%", pointerEvents: "none", right: "-10%", top: "-15%", background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)" }}
              />

              {/* 3D Stage */}
              <div style={{ position: "relative", width: "520px", height: "480px", transformStyle: "preserve-3d" }}>
                {/* Futuristic ring base */}
                <div style={{ position: "absolute", width: "420px", height: "420px", border: "2px solid rgba(0,210,255,0.20)", borderRadius: "50%", bottom: "-130px", right: "20px", transform: "rotateX(80deg) rotateY(10deg)", boxShadow: "0 0 40px rgba(0,210,255,0.15), inset 0 0 40px rgba(0,210,255,0.10)", pointerEvents: "none", zIndex: 1 }} />

                {/* Satisfaction 98% */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{ position: "absolute", top: "-10px", left: "170px", background: "rgba(18,24,56,0.72)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 22px", borderRadius: "14px", boxShadow: "0 25px 80px rgba(0,0,0,0.30)", zIndex: 25, transform: "perspective(2200px) rotate(-5deg)" }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0, 8, 0], x: [0, 5, -3, 5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>98%</div>
                    <div style={{ fontSize: "10px", color: "#6b7c96", whiteSpace: "nowrap" }}>Client Satisfaction</div>
                  </motion.div>
                </motion.div>

                {/* Cloud Widget */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{ position: "absolute", top: "15px", right: "-25px", background: "rgba(18,24,56,0.72)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "14px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 25px 80px rgba(0,0,0,0.30)", zIndex: 25 }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0, 8, 0], x: [0, 5, -3, 5, 0] }}
                    transition={{ duration: 9, delay: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Cloud style={{ color: "#00D2FF", width: "15px", height: "15px" }} />
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Cloud</div>
                      <div style={{ fontSize: "9px", color: "#6b7c96" }}>Deployed</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Projects 150+ */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  style={{ position: "absolute", top: "170px", left: "-50px", background: "rgba(18,24,56,0.72)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 22px", borderRadius: "14px", boxShadow: "0 25px 80px rgba(0,0,0,0.30)", zIndex: 5, transform: "perspective(2200px) rotate(3deg)" }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0, 8, 0], x: [0, 5, -3, 5, 0] }}
                    transition={{ duration: 8, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>150+</div>
                    <div style={{ fontSize: "10px", color: "#6b7c96", whiteSpace: "nowrap" }}>Projects Delivered</div>
                    <div className="avatar-group" style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                      <div className="avatar-mini" style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#f43f5e", border: "2px solid #080b1f", marginRight: "-5px" }} />
                      <div className="avatar-mini" style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3F8EFF", border: "2px solid #080b1f", marginRight: "-5px" }} />
                      <div className="avatar-mini" style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#27E18C", border: "2px solid #080b1f", marginRight: "-5px" }} />
                      <div className="avatar-mini" style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#eab308", border: "2px solid #080b1f", marginRight: "-5px" }} />
                      <span style={{ fontSize: "11px", marginLeft: "6px", color: "#6b7c96" }}>+</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Phone Mockup */}
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                  style={{ position: "absolute", left: "-35px", bottom: "-15px", zIndex: 30 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0, 7, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="mobile-mockup-frame"
                    style={{ width: "175px", height: "290px", background: "#070913", borderRadius: "26px", padding: "18px 14px", boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(47,123,255,0.20)", transform: "perspective(1800px) rotateX(4deg) rotateY(-10deg) rotateZ(-18deg) translateX(-40px) translateY(25px)", border: "3px solid rgba(255,255,255,0.09)", overflow: "hidden", position: "relative" }}
                  >
                    <div style={{ position: "absolute", inset: 0, borderRadius: "26px", background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,216,255,0.03) 60%, transparent 100%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", inset: 0, borderRadius: "26px", border: "1.5px solid rgba(0,216,255,0.18)", pointerEvents: "none" }} />
                    <div className="phone-inner-title" style={{ position: "relative", fontSize: "9px", color: "#6b7c96", textAlign: "center", marginBottom: "18px", zIndex: 1 }}>Ucode Mobile App</div>
                    <div className="phone-trophy-wrapper" style={{ position: "relative", textAlign: "center", margin: "20px 0", color: "#3F8EFF", fontSize: "26px", zIndex: 1 }}>
                      <Smartphone style={{ width: "26px", height: "26px" }} />
                    </div>
                    <div className="phone-stat-lbl" style={{ position: "relative", fontSize: "10px", color: "#6b7c96", zIndex: 1 }}>Users</div>
                    <div className="phone-stat-val" style={{ position: "relative", fontSize: "16px", fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px", zIndex: 1 }}>
                      <span style={{ color: "#FFFFFF" }}>24.8K</span>
                      <span style={{ color: "#10b981", fontSize: "10px" }}>↑ 28%</span>
                    </div>
                    <div className="phone-chart-bars" style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: "4px", height: "40px", marginTop: "30px", zIndex: 1 }}>
                      {[25, 50, 35, 80, 60, 95].map((h, i) => (
                        <div key={i} className="p-bar" style={{ flex: 1, background: "rgba(37,99,235,0.4)", borderRadius: "2px", height: `${h}%` }} />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Dashboard Canvas */}
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0, 6, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="dashboard-canvas" style={{
                      background: "rgba(18,24,56,0.80)",
                      backdropFilter: "blur(28px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "20px",
                      padding: "24px",
                      width: "480px",
                      position: "absolute",
                      right: "0",
                      top: "50px",
                      transform: "perspective(1300px) rotateX(1.5deg) rotateY(-4deg) rotateZ(-3.5deg) translateX(40px) translateY(30px) scale(1.12)",
                      boxShadow: "0 40px 120px rgba(0,0,0,0.42)",
                      zIndex: 10
                    }}>
                      <div className="dash-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <span className="dash-title" style={{ fontSize: "14px", fontWeight: 600, color: "#f8fafc", display: "flex", alignItems: "center", gap: "8px" }}>
                          <Grid style={{ color: "#4a5568", width: "16px", height: "16px" }} /> Deployment Overview
                        </span>
                        <span className="dash-status-live" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ display: "inline-block", width: "6px", height: "6px", background: "#10b981", borderRadius: "50%" }} /> Live
                        </span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "16px" }}>
                        <div className="dash-project-segment" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "12px", padding: "16px" }}>
                          <div className="project-meta" style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                            <span className="lbl" style={{ color: "#6b7c96" }}>Project: <strong style={{ color: "#fff" }}>Ucode Website</strong></span>
                            <span className="val" style={{ color: "#00D2FF", fontWeight: 700 }}>78%</span>
                          </div>
                          <div className="project-sub" style={{ fontSize: "11px", color: "#6b7c96", marginBottom: "12px" }}>Production Deployment</div>
                          <div className="progress-track" style={{ background: "rgba(255,255,255,0.06)", height: "6px", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" }}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "78%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                              style={{ background: "linear-gradient(to right, #00D2FF, #2563eb)", width: "78%", height: "100%", borderRadius: "3px" }}
                            />
                          </div>
                          <div className="deploy-msg" style={{ fontSize: "11px", color: "#4e5d78" }}>Deploying to CDN...</div>
                        </div>

                        <div className="performance-ring-box" style={{ borderLeft: "1px solid rgba(255,255,255,0.04)", paddingLeft: "16px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                          <div style={{ fontSize: "11px", color: "#6b7c96", marginBottom: "12px", alignSelf: "flex-start" }}>Performance</div>
                          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)", width: "64px", height: "64px" }}>
                              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                              <path strokeDasharray="98, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#00D2FF" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            <div style={{ position: "absolute", fontSize: "12px", fontWeight: 700, textAlign: "center" }}>
                              98<span style={{ fontSize: "8px", color: "#6b7c96", fontWeight: 400 }}>/100</span>
                            </div>
                          </div>
                          <div style={{ fontSize: "11px", color: "#10b981", fontWeight: 500, marginTop: "4px" }}>Excellent</div>
                        </div>
                      </div>

                      <div className="dash-bottom-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "16px", marginTop: "16px" }}>
                        <div className="analytics-card" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "12px", padding: "14px" }}>
                          <div className="analytics-header" style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6b7c96", marginBottom: "6px" }}>
                            <span>Website Analytics</span>
                            <span>This Week <ChevronDown style={{ width: "10px", height: "10px", display: "inline" }} /></span>
                          </div>
                          <div className="analytics-num" style={{ fontSize: "16px", fontWeight: 700, color: "#10b981", marginTop: "4px" }}>↑ 32%</div>
                          <div className="chart-svg-container" style={{ width: "100%", height: "48px", marginTop: "10px" }}>
                            <svg viewBox="0 0 100 30" width="100%" height="100%" preserveAspectRatio="none">
                              <path d="M0,22 Q15,5 30,18 T60,10 T90,14 T100,4" fill="none" stroke="#00D2FF" strokeWidth="2" />
                              <path d="M0,22 Q15,5 30,18 T60,10 T90,14 T100,4 L100,30 L0,30 Z" fill="rgba(0,210,255,0.03)" />
                            </svg>
                          </div>
                        </div>
                        <div className="tech-card" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "12px", padding: "14px" }}>
                          <div className="tech-title" style={{ fontSize: "11px", color: "#6b7c96", marginBottom: "10px" }}>Technologies</div>
                          <div className="tech-list" style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#cbd5e1" }}>
                            <div className="tech-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} /> Next.js</div>
                            <div className="tech-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} /> TypeScript</div>
                            <div className="tech-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a855f7" }} /> Node.js</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 2.5, duration: 0.6 }}
            style={{ textAlign: "center", paddingTop: "70px", paddingBottom: "50px" }}
          >
            <a href="#services" className="inline-flex flex-col items-center gap-2 text-[#9EA9C8]/30 hover:text-[#9EA9C8]/60 transition-colors group">
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
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
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="mx-auto" style={{ maxWidth: "1440px", padding: "0 32px", position: "relative", zIndex: 5 }}>
        <div style={{ position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "80px", background: "radial-gradient(ellipse, rgba(47,123,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <footer className="trusted-footer-banner" style={{ background: "#171A26", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 20px 60px rgba(0,0,0,0.28)" }}>
        <div className="footer-banner-title" style={{ color: "#AEB8D5", fontSize: "14px", fontWeight: 500, maxWidth: "160px", lineHeight: 1.4 }}>
          Trusted by businesses in India & beyond
        </div>
        <div className="brand-logos-container" style={{ display: "flex", alignItems: "center", gap: "50px" }}>
          {brands.map((b) => (
            <span
              key={b.name}
              className={`brand-logo-text ${b.className}`}
              style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.5px", color: "#D0D3DC", opacity: 0.72 }}
            >
              {b.name}
            </span>
          ))}
        </div>
        <div className="more-clients-tag" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", color: "#D0D3DC" }}>
          <div className="circle-plus" style={{ width: "20px", height: "20px", background: "#3F8EFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#FFFFFF" }}>+</div>
          <span>100+ More Clients</span>
        </div>
      </footer>
      </div>
    </>
  );
}
