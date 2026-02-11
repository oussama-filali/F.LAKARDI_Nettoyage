import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-cream"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Subtle grain */}
        <div className="absolute inset-0 bg-grain pointer-events-none" />

        <div className="relative flex flex-col items-center gap-5">
          {/* Horizontal reveal line */}
          <motion.div
            className="w-12 h-px bg-mint"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase === "hold" || phase === "exit" ? 1 : 0,
              opacity: phase === "hold" || phase === "exit" ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          />

          {/* Brand name — letter-by-letter reveal */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[0.15em] uppercase text-dark-deep"
              initial={{ y: "110%" }}
              animate={{ y: phase !== "enter" ? "0%" : "110%" }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
            >
              F. Lakardi
            </motion.h1>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden">
            <motion.p
              className="text-sm sm:text-base tracking-[0.35em] uppercase text-dark/50"
              initial={{ y: "110%" }}
              animate={{ y: phase !== "enter" ? "0%" : "110%" }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.35 }}
            >
              Nettoyage
            </motion.p>
          </div>

          {/* Bottom line */}
          <motion.div
            className="w-12 h-px bg-mint"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase === "hold" || phase === "exit" ? 1 : 0,
              opacity: phase === "hold" || phase === "exit" ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
          />

          {/* Loading bar */}
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-[2px] bg-mint/40 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: phase !== "enter" ? 120 : 0 }}
            transition={{ duration: 1.8, ease: "linear", delay: 0.3 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
