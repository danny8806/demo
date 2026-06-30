"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RippleButton from "./RippleButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blogs", href: "#blogs" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(document.documentElement.scrollTop > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1440px] transition-all duration-500 ${
          scrolled
            ? "bg-[#060816]/15 backdrop-blur-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            : "bg-[#060816]/15 backdrop-blur-[40px]"
        } border border-white/[0.04] rounded-[20px]`}
        style={{ height: "72px" }}
      >
        <div className="flex items-center justify-between h-full px-8 sm:px-12">
          <a href="#home" className="flex flex-col items-center gap-0 group py-1">
            <img
              src="/images/logo.png"
              alt="Ucode Infotech"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="hidden sm:block text-base font-bold text-white tracking-tight leading-tight">
              Ucode <span className="bg-gradient-to-r from-[#1DA1FF] to-[#00E5FF] bg-clip-text text-transparent">Infotech</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm transition-all duration-300 ${
                    isActive ? "text-white" : "text-[#B8C0D4] hover:text-white"
                  }`}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-[#1DA1FF] shadow-[0_0_8px_rgba(29,161,255,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <RippleButton
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#1DA1FF] to-[#7C4DFF] text-white text-sm font-semibold rounded-[18px] hover:shadow-lg hover:shadow-[#1DA1FF]/30 hover:scale-[1.02] transition-all duration-300"
            >
              Let&apos;s Talk
            </RippleButton>

            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-[#B8C0D4] hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/[0.06] bg-[#060816]/95 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm rounded-xl transition-all ${
                      activeSection === link.href.slice(1)
                        ? "text-white bg-white/[0.06]"
                        : "text-[#B8C0D4] hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2">
                  <RippleButton
                    onClick={() => { setMobileOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="w-full inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#1DA1FF] to-[#7C4DFF] text-white text-sm font-semibold rounded-[18px]"
                  >
                    Let&apos;s Talk
                  </RippleButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
