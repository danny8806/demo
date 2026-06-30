"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote: "Ucode Infotech's web development services helped our business scale online. Their team built a responsive, SEO-friendly website that increased our visibility and client engagement significantly. Highly professional and innovative solutions!",
    author: "Rahul Sharma",
    role: "Business Owner, Pathankot",
    avatar: "RS",
    color: "from-[#9A8FFA] to-[#C6C0FC]",
    rating: 5,
  },
  {
    quote: "The digital marketing services from Ucode Infotech improved our brand's online presence. Their SEO, social media, and content strategies increased traffic and conversions. The team is responsive, creative, and results-driven.",
    author: "Anita Verma",
    role: "Marketing Director, Punjab",
    avatar: "AV",
    color: "from-pink-400 to-rose-300",
    rating: 5,
  },
  {
    quote: "Ucode Infotech's mobile app development team delivered an intuitive and feature-rich app for our business. The project was handled professionally, with attention to user experience, speed, and performance.",
    author: "Vikram Singh",
    role: "CEO, TechStart Punjab",
    avatar: "VS",
    color: "from-indigo-300 to-purple-300",
    rating: 5,
  },
  {
    quote: "Their ERP solutions completely transformed how we manage our inventory and operations. The implementation was smooth and the team provided excellent training and support throughout.",
    author: "Priya Sharma",
    role: "Operations Head, Pathankot",
    avatar: "PS",
    color: "from-lime-400 to-green-300",
    rating: 4,
  },
  {
    quote: "We approached Ucode Infotech for a complete brand overhaul. Their design team delivered a stunning visual identity that perfectly captures our brand essence. Highly recommended!",
    author: "Arun Kapoor",
    role: "Founder, Kapoor Enterprises",
    avatar: "AK",
    color: "from-blue-300 to-sky-300",
    rating: 5,
  },
  {
    quote: "The UI/UX design work by Ucode Infotech significantly improved our website conversion rates. The team truly understands user behavior and designs experiences that drive results.",
    author: "Neha Gupta",
    role: "Product Manager, DigitalFirst",
    avatar: "NG",
    color: "from-yellow-300 to-amber-300",
    rating: 5,
  },
];

const logos = [
  "TechCorp", "DataFlow", "CloudNine", "SecureSys", "InnoSoft", "AlphaTech",
  "NexGen", "Quantum", "Pinnacle", "Meridian", "OmniCorp", "FusionX",
  "TechCorp", "DataFlow", "CloudNine", "SecureSys", "InnoSoft", "AlphaTech",
  "NexGen", "Quantum", "Pinnacle", "Meridian", "OmniCorp", "FusionX",
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    progressRef.current = 0;
    setProgress(0);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      progressRef.current = 0;
      setProgress(0);
    }, 6000);
    progressTimerRef.current = setInterval(() => {
      progressRef.current += 1;
      setProgress(progressRef.current);
    }, 60);
  };

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPaused]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    progressRef.current = 0;
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    startTimer();
  }, []);

  const goNext = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -50) goNext();
      else if (info.offset.x > 50) goPrev();
    },
    [goNext, goPrev]
  );

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1040] to-[#0a0a1a]" />
      <div className="absolute inset-0 animated-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#9A8FFA]/10 text-[#9A8FFA] text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              What Our{" "}
              <span className="gradient-text-animated">Clients Say</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Trusted by businesses in Pathankot, Punjab and beyond for quality digital solutions.
            </p>
          </div>
        </ScrollReveal>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[340px] flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goPrev}
              className="hidden sm:flex w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex-shrink-0"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <div className="flex-1 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="glass-card rounded-2xl p-8 md:p-12 text-center cursor-grab active:cursor-grabbing"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                        className={`w-5 h-5 ${
                          i < testimonials[current].rating
                            ? "text-yellow-400"
                            : "text-zinc-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-10 h-10 text-[#9A8FFA]/30 mx-auto mb-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                  </motion.svg>
                  <blockquote className="text-xl md:text-2xl text-zinc-100 leading-relaxed font-medium mb-8">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {testimonials[current].avatar}
                    </motion.div>
                    <div className="text-left">
                      <div className="text-white font-semibold">{testimonials[current].author}</div>
                      <div className="text-zinc-400 text-sm">{testimonials[current].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goNext}
              className="hidden sm:flex w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex-shrink-0"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          <div className="mt-6">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#9A8FFA] to-[#C6C0FC] rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${(progress / 100) * 100}%` }}
                transition={{ duration: 0.05 }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C6C0FC] shadow-lg shadow-[#9A8FFA]/50" />
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 ${
                  i === current
                    ? "bg-[#9A8FFA] w-8 h-2.5 rounded-full shadow-lg shadow-[#9A8FFA]/30"
                    : "bg-white/20 hover:bg-white/40 w-2.5 h-2.5 rounded-full"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-20 pt-16 border-t border-white/10">
            <p className="text-center text-sm text-zinc-500 uppercase tracking-widest mb-8">
              Trusted by businesses worldwide
            </p>
            <div className="overflow-hidden mask-gradient">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex gap-16 items-center"
              >
                {logos.map((logo, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, color: "#fff" }}
                    className="text-xl font-bold text-zinc-600 hover:text-zinc-300 transition-colors whitespace-nowrap cursor-default"
                  >
                    {logo}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
