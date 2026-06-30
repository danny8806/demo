"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    step: "01",
    title: "Discovery",
    description: "We dive deep into your business, goals, and target audience to craft a tailored strategy.",
    color: "from-[#06B6D4] to-[#2DD4BF]",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Strategy",
    description: "We create a comprehensive roadmap with clear milestones, timelines, and measurable KPIs.",
    color: "from-pink-400 to-rose-300",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Execute",
    description: "Our expert team brings the strategy to life with precision, creativity, and timely delivery.",
    color: "from-yellow-300 to-amber-300",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Optimize",
    description: "We continuously monitor, analyze, and refine to ensure peak performance and maximum ROI.",
    color: "from-lime-400 to-green-300",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

export default function ProcessTimeline() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#0a0a1a]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06B6D4]/[0.03] via-transparent to-[#2DD4BF]/[0.03]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-sm font-medium border border-[#06B6D4]/20 mb-4">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              How We <span className="gradient-text-animated">Deliver Results</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              A proven methodology that ensures every project exceeds expectations.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#06B6D4]/50 via-[#2DD4BF]/30 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"} distance={40}>
                <div className="relative md:flex items-start gap-8 group">
                  <div className="hidden md:flex w-16 flex-shrink-0 justify-center">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm font-bold text-[#0a0a1a] relative z-10 shadow-lg shadow-[#06B6D4]/20 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                      {item.icon}
                    </div>
                  </div>

                  <div className="md:hidden flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      Step {item.step}
                    </span>
                  </div>

                  <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:bg-white/[0.05] hover:border-[#06B6D4]/20 transition-all duration-500">
                    <div className="hidden md:flex items-center gap-3 mb-3">
                      <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#06B6D4] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
