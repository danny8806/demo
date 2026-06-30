"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const featuresList = [
  {
    title: "Expert Guidance",
    description: "Our experienced team in Pathankot provides actionable advice and technical expertise to help your business thrive digitally.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Affordable Solutions",
    description: "We deliver high-quality web, app, and ERP development services at competitive prices for all businesses in Pathankot.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Flexible Approach",
    description: "Our services are tailored to your business needs, providing flexibility in solutions, timelines, and scalability.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Client Satisfaction",
    description: "Trusted by clients in Pathankot for quality, timeliness, and results that exceed expectations.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
  {
    title: "Secure & Reliable",
    description: "Built with security at the core, our solutions keep your data and transactions safe and protected.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Diverse Solutions",
    description: "We offer a wide range of services including digital marketing, ERP, mobile apps, and web development in Pathankot.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
];

const services = [
  {
    title: "Web Development",
    subtitle: "Responsive & Modern",
    description: "We create modern, responsive websites that help your business grow online. From e-commerce to business portfolios, we build it all.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ["Responsive Design", "SEO Optimized", "E-commerce Ready", "Fast Performance"],
    gradient: "from-[#22D3EE] to-[#06B6D4]",
    tag: "web",
  },
  {
    title: "App Development",
    subtitle: "Android & iOS",
    description: "Custom Android and iOS apps built for performance, scalability, and great user experience.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: ["Native & Cross-platform", "UI/UX Focused", "App Store Ready", "Push Notifications"],
    gradient: "from-[#60A5FA] to-[#3B82F6]",
    tag: "app",
  },
  {
    title: "UI/UX Design",
    subtitle: "Intuitive Interfaces",
    description: "Designs that delight users — intuitive interfaces crafted for usability and engagement.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    gradient: "from-[#6366F1] to-[#818CF8]",
    tag: "uiux",
  },
  {
    title: "Digital Marketing",
    subtitle: "SEO & Social Media",
    description: "Boost your online presence with SEO, ads, and social media marketing campaigns in Pathankot, Punjab.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    features: ["SEO Optimization", "Social Media Marketing", "Paid Campaigns", "Content Strategy"],
    gradient: "from-[#60A5FA] to-[#22D3EE]",
    tag: "marketing",
  },
  {
    title: "ERP Solutions",
    subtitle: "Streamline Operations",
    description: "Implement robust ERP systems to streamline your business operations, manage resources, and drive growth.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    features: ["Inventory Management", "CRM Integration", "Reporting & Analytics", "Cloud-based"],
    gradient: "from-[#6366F1] to-[#22D3EE]",
    tag: "erp",
  },
  {
    title: "Branding & Content",
    subtitle: "Identity & Copywriting",
    description: "We help your brand stand out with unique logos, colors, and visual storytelling plus engaging content that drives results.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    features: ["Logo & Brand Identity", "Content Writing", "Blog & Web Copy", "Visual Storytelling"],
    gradient: "from-[#22D3EE] to-[#60A5FA]",
    tag: "branding",
  },
];

const filterTags = ["All", "web", "app", "uiux", "marketing", "erp", "branding"];
const filterLabels: Record<string, string> = {
  All: "All",
  web: "Web Dev",
  app: "App Dev",
  uiux: "UI/UX",
  marketing: "Marketing",
  erp: "ERP",
  branding: "Branding",
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 30000), 50);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.05,
        });
      }
    };
    init();

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
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
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

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
    />
  );
}

function FloatingBlob({ color, size, className, duration = 10, delay = 0 }: { color: string; size: number; className?: string; duration?: number; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
        opacity: 0.08,
      }}
      animate={{
        x: [0, 30, -20, 40, 0],
        y: [0, -40, 20, -30, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cardMousePos, setCardMousePos] = useState({ x: 50, y: 50 });

  const filtered = activeFilter === "All" ? services : services.filter((s) => s.tag === activeFilter);

  return (
    <section id="services" className="relative bg-white py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-[#22D3EE]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[#60A5FA]/10 blur-[130px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#6366F1]/[0.06] blur-[120px]" />

        <FloatingBlob color="#22D3EE" size={500} className="top-1/4 -left-32" duration={12} />
        <FloatingBlob color="#60A5FA" size={400} className="bottom-1/3 -right-24" duration={14} delay={2} />
        <FloatingBlob color="#6366F1" size={300} className="top-2/3 left-1/3" duration={10} delay={4} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-transparent via-[#22D3EE]/[0.04] to-transparent blur-[80px]" />
      </div>

      <ParticleField />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-[#22D3EE]/10 to-[#60A5FA]/10 text-[#06B6D4] text-sm font-semibold mb-6 border border-[#22D3EE]/20 tracking-wide"
            >
              Why Choose Us
            </motion.span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Kickstart Your{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#60A5FA] to-[#6366F1] bg-clip-text text-transparent">Digital Journey</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-normal text-zinc-400 block mt-3">with Us</span>
            </h2>

            <p className="mt-6 text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              We offer a wide range of digital solutions tailored to your business needs.
            </p>
          </div>
        </ScrollReveal>

        <LayoutGroup>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {featuresList.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <motion.div
                  layout
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 cursor-default border border-zinc-100 hover:border-[#22D3EE]/20 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#22D3EE]/5"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#22D3EE]/[0.02] to-[#60A5FA]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex flex-col items-center text-center gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] flex items-center justify-center text-white shadow-lg shadow-[#22D3EE]/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#22D3EE]/30">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#06B6D4] transition-colors duration-300">{item.title}</h3>
                      <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </LayoutGroup>

        <div className="relative mb-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-8 py-3 bg-white text-zinc-400 text-sm rounded-full border border-zinc-100 shadow-sm">
              Explore Our Expertise
            </span>
          </div>
        </div>

        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#60A5FA] to-[#6366F1] bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-500">
              Building solutions that empower your business — from concept to launch.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-14 p-2 bg-zinc-50/80 backdrop-blur-sm rounded-2xl max-w-fit mx-auto border border-zinc-100">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === tag
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {activeFilter === tag && (
                  <motion.span
                    layoutId="service-filter-bg"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] shadow-lg shadow-[#22D3EE]/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filterLabels[tag]}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, index) => (
              <ScrollReveal key={service.tag} delay={index * 0.05}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setCardMousePos({
                      x: ((e.clientX - rect.left) / rect.width) * 100,
                      y: ((e.clientY - rect.top) / rect.height) * 100,
                    });
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative bg-white/60 backdrop-blur-xl rounded-2xl p-9 border border-zinc-100 hover:border-[#22D3EE]/20 cursor-pointer transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#22D3EE]/10"
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(500px circle at ${cardMousePos.x}% ${cardMousePos.y}%, rgba(34, 211, 238, 0.06), transparent 50%)`,
                    }}
                  />
                  <div
                    className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.12] blur-3xl transition-opacity duration-700`}
                  />
                  <div
                    className={`absolute -bottom-12 -left-12 w-28 h-28 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.08] blur-3xl transition-opacity duration-700 delay-100`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white transition-all duration-500 shadow-lg ${
                          hoveredIndex === index ? "scale-110 -rotate-3 shadow-xl" : ""
                        }`}
                      >
                        {service.icon}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-400 group-hover:bg-[#22D3EE]/10 group-hover:text-[#06B6D4] transition-all duration-300">
                        {service.tag}
                      </span>
                    </div>

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#06B6D4] transition-colors duration-300">{service.title}</h3>
                        <span className="text-sm text-zinc-400 font-medium">{service.subtitle}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-[#06B6D4] transition-all duration-300 mt-1 flex-shrink-0 ${
                          hoveredIndex === index ? "translate-x-1.5 opacity-100" : "opacity-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-3 pt-5 border-t border-zinc-100">
                      {service.features.map((feature, fi) => (
                        <motion.div
                          key={fi}
                          animate={{
                            x: hoveredIndex === index ? 4 : 0,
                          }}
                          transition={{ duration: 0.2, delay: fi * 0.05 }}
                          className="flex items-center gap-3 text-sm text-zinc-500 group-hover:text-zinc-600 transition-colors"
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            hoveredIndex === index ? "scale-110" : ""
                          }`}>
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
