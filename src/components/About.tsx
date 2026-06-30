"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SplitFlipText from "./SplitFlipText";
import TextReveal from "./TextReveal";
import LiquidBlob from "./LiquidBlob";

const stats = [
  { value: 100, suffix: "+", label: "Happy Clients", decimals: 0 },
  { value: 50, suffix: "+", label: "Projects Delivered", decimals: 0 },
  { value: 5, suffix: "+", label: "Years Experience", decimals: 0 },
  { value: 98, suffix: "%", label: "Client Satisfaction", decimals: 0 },
];

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
  inView,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setCount(0);
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, value);
      setCount(current);
      if (step >= steps) {
        clearInterval(timer);
        setCount(value);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const formatted = new Intl.NumberFormat("en-IN").format(
    parseFloat(count.toFixed(decimals))
  );

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

function SkillBar({ label, percentage, delay }: { label: string; percentage: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-zinc-300">{label}</span>
        <span className="text-[#06B6D4]">{percentage}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF]"
        />
      </div>
    </div>
  );
}

export default function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);

  return (
    <section id="about" ref={sectionRef} className="relative bg-[#0a0a1a] py-16 md:py-24 lg:py-32 overflow-hidden content-visual-auto">
      <LiquidBlob color="#06B6D4" size={450} className="top-0 right-0 opacity-30" speed={14} />
      <LiquidBlob color="#2DD4BF" size={350} className="bottom-0 left-0 opacity-25" speed={10} delay={2} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2DD4BF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#06B6D4]/5 rounded-full blur-3xl" style={{ animation: "aurora 8s ease-in-out infinite" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <ScrollReveal direction="left" distance={60}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-sm font-medium mb-4">
              About Ucode Infotech
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              <TextReveal text="Building Solutions," as="span" delay={0.2} />
              <br />
              <SplitFlipText text="Enabling Progress" delay={0.5} className="gradient-text-animated" />
            </h2>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              We specialize in high-quality web development, mobile app development, ERP solutions, and digital marketing services in Pathankot. Our experienced team delivers tailored technology solutions that boost efficiency, enhance customer experiences, and drive business growth.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Delivering innovative software and ERP solutions to empower businesses.",
                "Making technology accessible, secure, and user-friendly for all clients.",
                "Client satisfaction is our priority, delivering timely and reliable solutions.",
                "Offering web & app development, ERP solutions, and digital transformation consulting.",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M7.61069 15.6913C5.57786 15.3025 3.77296 14.124 2.47482 12.5397C1.08881 10.8481 0.280511 8.69396 0.389311 6.54448C0.600013 2.38179 4.18604 -0.495177 8.38931 0.308668C10.6532 0.741629 12.0618 3.71742 13.3756 5.56959C14.5011 7.1562 15.7099 7.49558 15.6107 9.45546C15.3957 13.7033 11.814 16.4951 7.61069 15.6913Z" fill="#06B6D4" />
                  </svg>
                  <span className="text-zinc-300">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 space-y-5">
              <SkillBar label="Web & App Development" percentage={97} delay={0} />
              <SkillBar label="Digital Marketing" percentage={94} delay={0.2} />
              <SkillBar label="Client Satisfaction" percentage={98} delay={0.4} />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={60}>
            <div
              className="glass-card rounded-2xl p-8 md:p-10"
              style={{
                transform: "translateZ(0)",
                boxShadow: "0 0 40px rgba(154, 143, 250, 0.05)",
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Our Process</h3>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Explore Our Solutions",
                    description: "Browse our wide range of web apps, ERP tools, and software solutions designed to streamline your business operations.",
                    color: "from-[#06B6D4] to-[#2DD4BF]",
                  },
                  {
                    step: "02",
                    title: "Secure Implementation",
                    description: "Implement our solutions safely with robust security, ensuring your data and transactions are protected at every stage.",
                    color: "from-lime-400 to-green-300",
                  },
                  {
                    step: "03",
                    title: "Achieve Growth",
                    description: "Gain insights, optimize processes, and leverage our tools to scale your business efficiently and achieve long-term growth.",
                    color: "from-pink-400 to-rose-300",
                  },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.15} direction="right" distance={20}>
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm font-bold text-[#0a0a1a] flex-shrink-0 mt-1`}>
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{item.title}</h4>
                        <p className="text-zinc-400 text-sm mt-1">{item.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-white/10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <motion.span
                className="block text-4xl sm:text-5xl font-bold text-[#06B6D4] mb-2 stat-number group-hover:scale-110 transition-transform duration-300"
              >
                {statsInView ? (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} inView={statsInView} />
                ) : (
                  `0${stat.suffix}`
                )}
              </motion.span>
              <span className="text-zinc-500 text-sm">{stat.label}</span>
              <motion.div
                initial={{ width: 0 }}
                animate={statsInView ? { width: "60%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                className="h-0.5 bg-gradient-to-r from-[#06B6D4]/50 to-transparent rounded-full mx-auto mt-2"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
