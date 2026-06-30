"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import LiquidBlob from "./LiquidBlob";

const faqs = [
  {
    q: "What services does Ucode Infotech offer?",
    a: "We offer web development, mobile app development, UI/UX design, digital marketing (SEO, social media, paid campaigns), ERP solutions, and branding services. We're based in Pathankot, Punjab and serve clients across India.",
  },
  {
    q: "How much do your services cost?",
    a: "Our pricing depends on the scope and complexity of the project. We offer affordable solutions tailored to businesses of all sizes. Contact us for a free consultation and customized quote.",
  },
  {
    q: "Do you offer internship opportunities?",
    a: "Yes! We offer internships in web development, app development, digital marketing, and design. Interns get hands-on experience working on real projects with our experienced team.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A standard business website typically takes 2-4 weeks. E-commerce sites and custom web applications may take 6-12 weeks depending on complexity. We'll provide a timeline during our consultation.",
  },
  {
    q: "Do you provide digital marketing services in Pathankot?",
    a: "Absolutely. We specialize in digital marketing services in Pathankot, Punjab, including SEO, social media marketing, Google Ads, and content marketing for local businesses.",
  },
  {
    q: "What is your response time for support?",
    a: "We typically respond within 24 hours during business days. For ongoing clients, we provide priority support with faster response times.",
  },
];

function FaqItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className="group cursor-pointer border border-zinc-200 rounded-2xl p-6 hover:border-[#9A8FFA]/30 hover:shadow-md hover:shadow-[#9A8FFA]/5 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base sm:text-lg font-semibold text-[#0a0a1a] group-hover:text-[#9A8FFA] transition-colors">
          {q}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#9A8FFA]/10 transition-colors"
        >
          <svg className="w-4 h-4 text-zinc-600 group-hover:text-[#9A8FFA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-zinc-600 text-sm leading-relaxed border-t border-zinc-100 pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden content-visual-auto">
      <LiquidBlob color="#9A8FFA" size={350} className="top-0 left-0 opacity-40" speed={11} />
      <LiquidBlob color="#C6C0FC" size={280} className="bottom-0 right-0 opacity-30" speed={8} delay={3} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#9A8FFA]/10 text-[#9A8FFA] text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a1a]">
              Frequently Asked{" "}
              <span className="gradient-text-animated">Questions</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Everything you need to know about Ucode Infotech and our services.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FaqItem
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
