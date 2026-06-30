"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const footerLinks = {
  Services: ["Web Development", "App Development", "UI/UX Design", "Digital Marketing", "ERP Solutions", "Branding & Content"],
  Company: ["About Us", "Blog", "Contact Us", "Privacy Policy", "Terms of Service"],
  Support: ["Help Center", "FAQ", "Service Status", "Feedback", "Community", "Training"],
};

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#2DD4BF] flex items-center justify-center text-[#0a0a1a] shadow-lg shadow-[#06B6D4]/30 hover:scale-110 transition-all duration-300"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#0a0a1a] border-t border-white/5 content-visual-auto">
      <BackToTop />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 border-b border-white/5">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold text-white mb-2">
              Stay updated with <span className="text-[#06B6D4]">Ucode Infotech</span>
            </h3>
            <p className="text-zinc-400 text-sm mb-4">
              Get the latest insights on web development, digital marketing, app development, and tech trends delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-medium text-sm text-[#0a0a1a] bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF] hover:shadow-lg hover:shadow-[#06B6D4]/30 transition-all duration-300 hover:scale-105 flex-shrink-0"
              >
                {subscribed ? "Subscribed! ✓" : "Subscribe"}
              </button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-green-400 mt-2"
              >
                Thanks for subscribing!
              </motion.p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 py-16">
          <div className="lg:col-span-2">
            <a href="#home" className="flex flex-col items-start gap-0.5 group mb-4">
              <img
                src="/images/logo.png"
                alt="Ucode Infotech"
                className="h-14 w-auto object-contain"
              />
              <span className="text-base font-bold text-white tracking-tight leading-none">
                Ucode <span className="text-[#06B6D4]">Infotech</span>
              </span>
            </a>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              Digital marketing services and IT solutions in Pathankot, Punjab. We craft powerful digital solutions that help businesses grow smarter and faster.
            </p>
            <div className="flex gap-3">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  aria-label={social}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links], index) => (
            <ScrollReveal key={title} delay={index * 0.1} direction="up" distance={30}>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-400 hover:text-[#06B6D4] transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
                </ul>
              </div>
            </ScrollReveal>
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pb-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500"
        >
          <p>&copy; {year} Ucode Infotech. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
