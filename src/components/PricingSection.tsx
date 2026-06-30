"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    name: "Starter",
    price: "₹9,999",
    period: "/month",
    description: "Perfect for small businesses starting their digital journey.",
    features: ["Responsive Website (5 pages)", "Basic SEO Setup", "Social Media Management (2 platforms)", "Monthly Performance Report", "Email Support"],
    color: "from-[#06B6D4] to-[#2DD4BF]",
    popular: false,
  },
  {
    name: "Growth",
    price: "₹24,999",
    period: "/month",
    description: "Ideal for growing businesses needing comprehensive digital solutions.",
    features: ["Responsive Website (10 pages)", "Advanced SEO & Analytics", "Social Media Management (4 platforms)", "Content Marketing (4 posts/month)", "Google Ads Management", "Priority Support"],
    color: "from-pink-400 to-rose-300",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations with specific requirements.",
    features: ["Custom Web Application", "ERP Integration", "Full Digital Marketing Suite", "Dedicated Project Manager", "24/7 Priority Support", "Monthly Strategy Calls"],
    color: "from-yellow-300 to-amber-300",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#FAFAF9]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06B6D4]/[0.02] via-transparent to-[#2DD4BF]/[0.02]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-sm font-medium border border-[#06B6D4]/20 mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a1a]">
              Transparent <span className="gradient-text-animated">Pricing</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Choose the plan that fits your business needs. No hidden fees.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className={`relative bg-white rounded-2xl p-8 border transition-all duration-500 ${
                  plan.popular
                    ? "border-[#06B6D4]/30 shadow-xl shadow-[#06B6D4]/10 ring-1 ring-[#06B6D4]/20"
                    : "border-zinc-200 hover:border-[#06B6D4]/20 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF] text-xs font-semibold text-[#0a0a1a]">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#0a0a1a]">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#0a0a1a]">{plan.price}</span>
                    {plan.period && <span className="text-zinc-400 text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-zinc-500 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm text-zinc-600">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById("contact");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? "text-[#0a0a1a] bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF] hover:shadow-lg hover:shadow-[#06B6D4]/30"
                      : "text-[#0a0a1a] bg-zinc-100 hover:bg-zinc-200"
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
