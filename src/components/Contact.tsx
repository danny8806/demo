"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

function FloatInput({
  id,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-6 pb-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#9A8FFA]/50 focus:border-[#9A8FFA] transition-all peer"
      />
      <motion.label
        htmlFor={id}
        animate={{
          y: isActive ? 0 : 20,
          fontSize: isActive ? "0.75rem" : "0.875rem",
          color: focused ? "#9A8FFA" : isActive ? "#71717a" : "#a1a1aa",
        }}
        transition={{ duration: 0.15 }}
        className={`absolute left-4 top-2 pointer-events-none ${isActive ? "opacity-100" : "opacity-0"}`}
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </motion.label>
      {!isActive && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400 pointer-events-none">
          {label}{required && " *"}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative bg-white py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#9A8FFA]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C6C0FC]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal direction="left" distance={40}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#9A8FFA]/10 text-[#9A8FFA] text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a1a] leading-tight">
              Ready. Set.{" "}
              <span className="gradient-text-animated">Go.</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
              It&apos;s time to make your dream come true. Whether you need a website, mobile app, digital marketing strategy, or ERP solution — we are here to help. Contact us today for a free consultation.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Email Us",
                  detail: "info@ucodeinfotech.com",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Location",
                  detail: "Pathankot, Punjab, India",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Response Time",
                  detail: "We typically respond within 24 hours",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="left" distance={20}>
                  <div className="flex items-center gap-4 group"
                    style={{ transform: "translateZ(0)" }}
                  >
                  <div className="w-12 h-12 rounded-xl bg-[#9A8FFA]/10 flex items-center justify-center text-[#9A8FFA] flex-shrink-0 group-hover:scale-110 group-hover:bg-[#9A8FFA]/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0a1a]">{item.title}</div>
                    <div className="text-zinc-500 text-sm">{item.detail}</div>
                  </div>
                </div>
                  </ScrollReveal>
                ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={40}>
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <FloatInput id="name" label="Full Name" required placeholder="John Doe" />
                <FloatInput id="email" type="email" label="Email Address" required placeholder="john@company.com" />
              </div>

              <FloatInput id="phone" label="Phone Number" placeholder="+91 98765 43210" />

              <div>
                <select
                  id="service"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#9A8FFA]/50 focus:border-[#9A8FFA] transition-all"
                >
                  <option value="">Select a service...</option>
                  <option value="web">Web Development</option>
                  <option value="app">App Development</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="erp">ERP Solutions</option>
                  <option value="branding">Branding & Content</option>
                  <option value="internship">Internship</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Tell us about your project..."
                  maxLength={1000}
                  onChange={(e) => setCharCount(e.target.value.length)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#9A8FFA]/50 focus:border-[#9A8FFA] transition-all resize-none"
                />
                <div className="absolute bottom-2 right-3 text-xs text-zinc-400">
                  {charCount}/1000
                </div>
              </div>

              <MagneticButton strength={0.15}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-4 px-6 rounded-xl font-semibold text-[#0a0a1a] bg-gradient-to-r from-[#9A8FFA] to-[#C6C0FC] hover:shadow-xl hover:shadow-[#9A8FFA]/30 transition-all duration-300 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : submitted ? (
                  "Message Sent! ✓"
                ) : (
                  "Send Message"
                )}
              </motion.button>
              </MagneticButton>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-xl px-4 py-3"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Thanks for reaching out! We will get back to you within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
