"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import GlareCard from "./GlareCard";
import LiquidBlob from "./LiquidBlob";

const blogs = [
  {
    title: "8 Content Marketing Tips to Boost Traffic & Sales",
    tag: "Digital Marketing",
    tagColor: "from-[#9A8FFA] to-[#C6C0FC]",
    excerpt: "Discover 8 actionable content marketing tips to boost traffic, engage users, and increase sales for your business.",
    date: "23 Jan 2026",
    image: "bg-gradient-to-br from-[#9A8FFA] to-[#6B5FD9]",
    icon: "📝",
  },
  {
    title: "Top 10 Mobile App Development Trends for Small Businesses",
    tag: "App Development",
    tagColor: "from-pink-400 to-rose-300",
    excerpt: "Discover the top 10 mobile app development trends for small businesses in 2026. Stay ahead with AI, cross-platform tools, and more.",
    date: "23 Jan 2026",
    image: "bg-gradient-to-br from-pink-400 to-rose-500",
    icon: "📱",
  },
  {
    title: "10 Digital Marketing Tips for Small Businesses & Startups",
    tag: "Digital Marketing",
    tagColor: "from-[#9A8FFA] to-[#C6C0FC]",
    excerpt: "Discover 10 proven digital marketing tips to help small businesses and startups grow online effectively.",
    date: "23 Jan 2026",
    image: "bg-gradient-to-br from-indigo-400 to-purple-500",
    icon: "📊",
  },
  {
    title: "Why Your Business Needs a Responsive Website in 2026",
    tag: "Web Development",
    tagColor: "from-blue-300 to-sky-300",
    excerpt: "Learn why responsive web design is critical for your business success and how it impacts SEO, user experience, and conversions.",
    date: "15 Jan 2026",
    image: "bg-gradient-to-br from-blue-400 to-cyan-500",
    icon: "🌐",
  },
  {
    title: "ERP Implementation Guide for Growing Businesses",
    tag: "ERP Solutions",
    tagColor: "from-lime-400 to-green-300",
    excerpt: "A complete guide to implementing ERP systems for growing businesses. Streamline operations and scale efficiently.",
    date: "10 Jan 2026",
    image: "bg-gradient-to-br from-lime-500 to-green-600",
    icon: "⚙️",
  },
  {
    title: "UI/UX Design Principles That Drive Conversions",
    tag: "UI/UX Design",
    tagColor: "from-indigo-300 to-purple-300",
    excerpt: "Explore the key UI/UX design principles that can dramatically improve your website conversion rates and user retention.",
    date: "05 Jan 2026",
    image: "bg-gradient-to-br from-purple-400 to-indigo-500",
    icon: "🎨",
  },
];

const filterTags = ["All", "Digital Marketing", "App Development", "Web Development", "ERP Solutions", "UI/UX Design"];

export default function CaseStudies() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filtered = activeTag === "All" ? blogs : blogs.filter((b) => b.tag === activeTag);

  return (
    <section id="blogs" className="relative bg-zinc-50 py-16 md:py-24 lg:py-32 overflow-hidden content-visual-auto">
      <LiquidBlob color="#9A8FFA" size={350} className="top-0 right-0" speed={12} />
      <LiquidBlob color="#C6C0FC" size={250} className="bottom-0 left-0" speed={9} delay={4} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#9A8FFA]/10 text-[#9A8FFA] text-sm font-medium mb-4">
              News & Articles
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a1a]">
              Insights &{" "}
              <span className="gradient-text-animated">Updates</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Stay informed with the latest trends, tips, and insights from our team on digital marketing, web development, and more.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-1.5 mb-12 p-1.5 bg-white rounded-2xl max-w-fit mx-auto border border-zinc-100">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTag === tag
                    ? "text-white"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {activeTag === tag && (
                  <motion.span
                    layoutId="blog-filter-bg"
                    className="absolute inset-0 rounded-xl bg-[#9A8FFA] shadow-lg shadow-[#9A8FFA]/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((blog, i) => (
              <ScrollReveal key={blog.title} delay={i * 0.08}>
                <GlareCard glareColor="rgba(255, 255, 255, 0.1)">
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 group ${
                  expandedIndex === i ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                <div className={`${blog.image} p-8 h-full min-h-[320px] relative`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{blog.icon}</span>
                      <span
                        className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${blog.tagColor}`}
                      >
                        {blog.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{blog.title}</h3>
                    <p className="text-zinc-200 text-sm leading-relaxed flex-1">{blog.excerpt}</p>

                    <AnimatePresence>
                      {expandedIndex === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-white/20"
                        >
                          <div className="flex items-center gap-2 text-sm text-[#9A8FFA] font-medium">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Published: {blog.date}
                          </div>
                          <p className="text-zinc-300 text-sm mt-2">
                            {blog.excerpt} Click to read the full article on our blog.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-4 flex items-center gap-1 text-sm text-white font-medium">
                      <span>{expandedIndex === i ? "Show less" : "Read more"}</span>
                      <motion.svg
                        animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </motion.div>
                </GlareCard>
            </ScrollReveal>
          ))}
        </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
