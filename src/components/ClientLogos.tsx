"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const clients = [
  { name: "TechCorp", industry: "Technology" },
  { name: "GreenLeaf", industry: "Agriculture" },
  { name: "MediCare", industry: "Healthcare" },
  { name: "EduPro", industry: "Education" },
  { name: "RetailPlus", industry: "Retail" },
  { name: "FinServ", industry: "Finance" },
  { name: "BuildRight", industry: "Real Estate" },
  { name: "FoodieHub", industry: "Food & Beverage" },
];

export default function ClientLogos() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#0a0a1a]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/[0.02] via-transparent to-[#2DD4BF]/[0.02]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-zinc-400 text-sm font-medium border border-white/10">
              Trusted By
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4">
              Brands That <span className="text-[#06B6D4]">Trust Us</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <ScrollReveal key={client.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:bg-white/[0.06] hover:border-[#06B6D4]/20 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-600 flex items-center justify-center mx-auto mb-3 group-hover:from-[#06B6D4]/20 group-hover:to-[#2DD4BF]/20 transition-all duration-500">
                  <svg className="w-6 h-6 text-zinc-400 group-hover:text-[#06B6D4] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm">{client.name}</p>
                <p className="text-zinc-500 text-xs mt-1">{client.industry}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
