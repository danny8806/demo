"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commands = [
  { cmd: "build --solution=digital --target=growth", output: "✓ Digital strategy compiled" },
  { cmd: "deploy --env=production --stack=web", output: "✓ Website deployed to CDN" },
  { cmd: "analyze --metrics=seo,perf,access", output: "✓ Score: 96/100 - Excellent" },
  { cmd: "sync --target=social --campaign=q2", output: "✓ Campaigns synced & live" },
  { cmd: "optimize --for=conversion --device=all", output: "✓ CRO ready - 32% uplift expected" },
];

export default function InteractiveTerminal() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);

  const typeCommand = useCallback(async (text: string) => {
    setTyping("");
    setShowOutput(false);
    for (let i = 0; i <= text.length; i++) {
      await new Promise((r) => setTimeout(r, 30));
      setTyping(text.slice(0, i));
    }
    await new Promise((r) => setTimeout(r, 400));
    setShowOutput(true);
  }, []);

  useEffect(() => {
    if (step < commands.length) {
      const c = commands[step];
      typeCommand(c.cmd);
      const timer = setTimeout(() => {
        setHistory((prev) => [...prev, { cmd: c.cmd, output: c.output }]);
        setStep((s) => s + 1);
      }, 1500 + c.cmd.length * 30 + 400);
      return () => clearTimeout(timer);
    }
  }, [step, typeCommand]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input.trim();
    const response = `❌ Unknown command: ${cmd}. Try: help, about, services, contact`;
    setHistory((prev) => [...prev, { cmd, output: response }]);
    setInput("");
  };

  return (
    <div className="relative glass-card rounded-3xl p-6 group hover:border-[#06B6D4]/30 transition-all duration-500 overflow-hidden">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60 group-hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60 group-hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/60 group-hover:bg-green-500 transition-colors" />
        </div>
        <span className="text-xs text-zinc-500">ucodeinfotech.com</span>
        <span className="ml-auto text-[#06B6D4] text-xs animate-pulse">● interactive</span>
      </div>

      <div className="font-mono text-sm space-y-1.5 min-h-[200px]">
        <AnimatePresence>
          {history.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-0.5"
            >
              <div className="flex">
                <span className="text-green-400">$</span>
                <span className="text-zinc-100 ml-2">{h.cmd}</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#06B6D4] ml-4"
              >
                {h.output}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {step < commands.length && (
          <div className="flex">
            <span className="text-green-400">$</span>
            <span className="text-zinc-100 ml-2">
              {typing}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="text-zinc-100"
              >
                ▊
              </motion.span>
            </span>
            {showOutput && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-300 ml-4"
              >
                ✓
              </motion.span>
            )}
          </div>
        )}

        {step >= commands.length && (
          <form onSubmit={handleCommandSubmit} className="flex items-center mt-2">
            <span className="text-green-400">$</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type help..."
              className="flex-1 bg-transparent text-zinc-100 ml-2 outline-none placeholder-zinc-600"
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-zinc-100"
            >
              ▊
            </motion.span>
          </form>
        )}
      </div>
    </div>
  );
}
