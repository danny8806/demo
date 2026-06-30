"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const team = [
  {
    name: "Somil Saini",
    role: "Founder & CEO",
    description: "Visionary leader driving digital innovation and business growth across Pathankot and beyond.",
    color: "from-[#06B6D4] to-[#2DD4BF]",
    initials: "SS",
  },
  {
    name: "Priya Sharma",
    role: "Lead Developer",
    description: "Full-stack developer specializing in React, Next.js, and scalable web applications.",
    color: "from-pink-400 to-rose-300",
    initials: "PS",
  },
  {
    name: "Amit Kumar",
    role: "Digital Marketing Head",
    description: "SEO and performance marketing expert with 8+ years of experience driving ROI.",
    color: "from-yellow-300 to-amber-300",
    initials: "AK",
  },
  {
    name: "Neha Gupta",
    role: "UI/UX Designer",
    description: "Creative designer crafting intuitive and beautiful user experiences for web and mobile.",
    color: "from-indigo-300 to-purple-300",
    initials: "NG",
  },
];

export default function TeamSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-zinc-50">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06B6D4]/[0.02] via-transparent to-[#2DD4BF]/[0.02]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-sm font-medium border border-[#06B6D4]/20 mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a1a]">
              Meet the <span className="gradient-text-animated">Experts</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              A passionate team dedicated to delivering exceptional digital solutions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-2xl p-6 border border-zinc-200 hover:border-[#06B6D4]/20 transition-all duration-500 text-center"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-5 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-lg`}>
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0a0a1a] group-hover:text-[#06B6D4] transition-colors duration-300">
                  {member.name}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#06B6D4]">
                  {member.role}
                </span>
                <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                  {member.description}
                </p>
                <div className="flex justify-center gap-2 mt-5 pt-4 border-t border-zinc-100">
                  {["linkedin", "twitter", "mail"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4] transition-all duration-300"
                      aria-label={social}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
