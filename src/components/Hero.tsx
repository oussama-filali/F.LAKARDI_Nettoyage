import { motion } from "framer-motion";

/* Splits text into individually hoverable letters */
function FlipName({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span key={i} className={char === " " ? "inline" : "flip-letter"}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.18, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

interface HeroProps {
  animateIn?: boolean;
}

export default function Hero({ animateIn = false }: HeroProps) {
  return (
    <section className="h-full relative flex items-center bg-grain overflow-hidden bg-gradient-to-br from-cream via-sage to-sage-mid">
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-mint/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-sage-mid/25 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-20">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-dark-deep"
          variants={fadeUp}
          initial="hidden"
          animate={animateIn ? "visible" : "hidden"}
          custom={0}
        >
          Nettoyage de précision
          <br />
          <span className="text-mint-dark">à Marseille</span>
        </motion.h1>

        <motion.p
          className="mt-5 text-dark/70 text-lg md:text-xl max-w-xl"
          variants={fadeUp}
          initial="hidden"
          animate={animateIn ? "visible" : "hidden"}
          custom={1}
        >
          Conciergerie Airbnb • Vitres • Fin de chantier • Bureaux — Devis rapide, résultats impeccables.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          variants={fadeUp}
          initial="hidden"
          animate={animateIn ? "visible" : "hidden"}
          custom={2}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-mint text-dark-deep font-bold text-base hover:bg-mint-dark hover:text-white transition-colors shadow-lg shadow-mint/30"
          >
            Demander une intervention
          </a>
          <a
            href="tel:+33783289113"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-dark/15 bg-white/40 text-dark-deep font-semibold hover:bg-white/60 transition-colors backdrop-blur-sm"
          >
            Appeler maintenant
          </a>
        </motion.div>

        <motion.p
          className="mt-6 text-dark/50 text-sm tracking-wide"
          variants={fadeUp}
          initial="hidden"
          animate={animateIn ? "visible" : "hidden"}
          custom={3}
        >
          Réponse sous 2h • 7j/7 • Intervention flexible
        </motion.p>

        {/* Accreditation */}
        <motion.div
          className="mt-10 flex items-center gap-3"
          variants={fadeUp}
          initial="hidden"
          animate={animateIn ? "visible" : "hidden"}
          custom={4}
        >
          <span className="h-px w-8 bg-mint-dark/40" />
          <p className="text-dark/60 text-sm">
            Gérante&nbsp;:&nbsp;
            <FlipName
              text="Fatiha Lakardi"
              className="font-semibold text-dark-deep tracking-wide"
            />
          </p>
          <span className="h-px w-8 bg-mint-dark/40" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {animateIn && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 text-dark/40"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-[11px] uppercase tracking-[0.25em]">Swipe →</span>
          <motion.span
            className="h-px w-6 bg-mint-dark/50"
            animate={{ scaleX: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </section>
  );
}
