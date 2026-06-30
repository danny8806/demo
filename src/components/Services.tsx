"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlareCard from "./GlareCard";
import GradientBorder from "./GradientBorder";
import LiquidBlob from "./LiquidBlob";

const featuresList = [
  {
    title: "Expert Guidance",
    description: "Our experienced team in Pathankot provides actionable advice and technical expertise to help your business thrive digitally.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "from-[#9A8FFA] to-[#C6C0FC]",
    border: "#C6C0FC",
  },
  {
    title: "Affordable Solutions",
    description: "We deliver high-quality web, app, and ERP development services at competitive prices for all businesses in Pathankot.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-pink-400 to-rose-300",
    border: "#FFC0CB",
  },
  {
    title: "Flexible Approach",
    description: "Our services are tailored to your business needs, providing flexibility in solutions, timelines, and scalability.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: "from-indigo-300 to-purple-300",
    border: "#D7D2FD",
  },
  {
    title: "Client Satisfaction",
    description: "Trusted by clients in Pathankot for quality, timeliness, and results that exceed expectations.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    color: "from-yellow-300 to-amber-300",
    border: "#FFF1C0",
  },
  {
    title: "Secure & Reliable",
    description: "Built with security at the core, our solutions keep your data and transactions safe and protected.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "from-lime-400 to-green-300",
    border: "#D0E9A8",
  },
  {
    title: "Diverse Solutions",
    description: "We offer a wide range of services including digital marketing, ERP, mobile apps, and web development in Pathankot.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    color: "from-blue-300 to-sky-300",
    border: "#D2E8FE",
  },
];

const services = [
  {
    title: "Web Development",
    subtitle: "Responsive & Modern",
    description: "We create modern, responsive websites that help your business grow online. From e-commerce to business portfolios, we build it all.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ["Responsive Design", "SEO Optimized", "E-commerce Ready", "Fast Performance"],
    color: "from-[#9A8FFA] to-[#C6C0FC]",
    tag: "web",
  },
  {
    title: "App Development",
    subtitle: "Android & iOS",
    description: "Custom Android and iOS apps built for performance, scalability, and great user experience.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: ["Native & Cross-platform", "UI/UX Focused", "App Store Ready", "Push Notifications"],
    color: "from-pink-400 to-rose-300",
    tag: "app",
  },
  {
    title: "UI/UX Design",
    subtitle: "Intuitive Interfaces",
    description: "Designs that delight users — intuitive interfaces crafted for usability and engagement.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    color: "from-indigo-300 to-purple-300",
    tag: "uiux",
  },
  {
    title: "Digital Marketing",
    subtitle: "SEO & Social Media",
    description: "Boost your online presence with SEO, ads, and social media marketing campaigns in Pathankot, Punjab.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    features: ["SEO Optimization", "Social Media Marketing", "Paid Campaigns", "Content Strategy"],
    color: "from-yellow-300 to-amber-300",
    tag: "marketing",
  },
  {
    title: "ERP Solutions",
    subtitle: "Streamline Operations",
    description: "Implement robust ERP systems to streamline your business operations, manage resources, and drive growth.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    features: ["Inventory Management", "CRM Integration", "Reporting & Analytics", "Cloud-based"],
    color: "from-lime-400 to-green-300",
    tag: "erp",
  },
  {
    title: "Branding & Content",
    subtitle: "Identity & Copywriting",
    description: "We help your brand stand out with unique logos, colors, and visual storytelling plus engaging content that drives results.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    features: ["Logo & Brand Identity", "Content Writing", "Blog & Web Copy", "Visual Storytelling"],
    color: "from-blue-300 to-sky-300",
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

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? services : services.filter((s) => s.tag === activeFilter);

  return (
    <section id="services" className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden content-visual-auto">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      <LiquidBlob color="#9A8FFA" size={400} className="top-0 -right-20 opacity-50" speed={10} />
      <LiquidBlob color="#C6C0FC" size={300} className="bottom-0 -left-20 opacity-40" speed={8} delay={3} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-[#9A8FFA]/10 text-[#9A8FFA] text-sm font-medium mb-4 border border-[#9A8FFA]/20"
            >
              Why Choose Us
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a1a]">
              Kickstart Your{" "}
              <span className="gradient-text-animated">Digital Journey</span> with Us
            </h2>
            <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto">
              We offer a wide range of digital solutions tailored to your business needs.
            </p>
          </div>
        </ScrollReveal>

        <LayoutGroup>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {featuresList.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.08}>
                <GradientBorder className="rounded-2xl h-full">
                <GlareCard glareColor="rgba(154, 143, 250, 0.06)">
                <motion.div
                  layout
                  whileHover={{ y: -4 }}
                  className="group relative bg-white rounded-2xl p-7 cursor-default hover:shadow-xl hover:shadow-[#9A8FFA]/10 transition-all duration-500 h-full border border-zinc-100"
                >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                />
                <div className="flex flex-col items-center text-center gap-4 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-[#9A8FFA]/30`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0a0a1a] group-hover:text-[#9A8FFA] transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
                </GlareCard>
                </GradientBorder>
              </ScrollReveal>
            ))}
          </motion.div>
        </LayoutGroup>

        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-6 py-2 bg-white text-zinc-400 text-sm rounded-full border border-zinc-200 shadow-sm">
              Explore Our Expertise
            </span>
          </div>
        </div>

        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a1a]">
              Our <span className="gradient-text-animated">Services</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Building solutions that empower your business — from concept to launch.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-1.5 mb-12 p-1.5 bg-zinc-50/80 rounded-2xl max-w-fit mx-auto border border-zinc-200/50">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === tag
                    ? "text-white"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {activeFilter === tag && (
                  <motion.span
                    layoutId="service-filter-bg"
                    className="absolute inset-0 rounded-xl bg-[#9A8FFA] shadow-lg shadow-[#9A8FFA]/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filterLabels[tag]}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, index) => (
              <ScrollReveal key={service.tag} delay={index * 0.05}>
                <GradientBorder className="rounded-2xl h-full">
                <GlareCard glareColor="rgba(154, 143, 250, 0.08)">
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ y: -6 }}
                  className="service-card group relative bg-white rounded-2xl p-8 border border-zinc-200 hover:border-transparent cursor-pointer transition-all duration-500"
                >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
                />
                <div
                  className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700`}
                />
                <div
                  className={`absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 delay-100`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white transition-all duration-500 shadow-lg shadow-[#9A8FFA]/10 ${
                        hoveredIndex === index ? "scale-110 -rotate-3 shadow-xl shadow-[#9A8FFA]/30" : ""
                      }`}
                    >
                      {service.icon}
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 text-zinc-400 group-hover:bg-[#9A8FFA]/10 group-hover:text-[#9A8FFA] transition-all duration-300`}>
                      {service.tag}
                    </span>
                  </div>

                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#0a0a1a] group-hover:text-[#9A8FFA] transition-colors duration-300">{service.title}</h3>
                      <span className="text-sm text-zinc-400 font-medium">{service.subtitle}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#9A8FFA] transition-all duration-300 mt-1 flex-shrink-0 ${
                        hoveredIndex === index ? "translate-x-2 opacity-100" : "opacity-30"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  <p className="text-zinc-600 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-zinc-100">
                    {service.features.map((feature, fi) => (
                      <motion.div
                        key={fi}
                        animate={{
                          x: hoveredIndex === index ? 4 : 0,
                        }}
                        transition={{ duration: 0.2, delay: fi * 0.05 }}
                        className="flex items-center gap-3 text-sm text-zinc-500 group-hover:text-zinc-700 transition-colors"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
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
                </GlareCard>
                </GradientBorder>
            </ScrollReveal>
          ))}
        </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
