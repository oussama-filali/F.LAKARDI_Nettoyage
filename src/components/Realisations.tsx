import { useState, useCallback, useEffect } from "react";
import { useRevealOnView } from "../hooks/useRevealOnView";

const photos = [
  { src: "/images/salon.jpg",              alt: "Nettoyage réalisé – salon" },
  { src: "/images/salon2.jpeg",            alt: "Nettoyage réalisé – espace de vie" },
  { src: "/images/sdb.jpeg",              alt: "Nettoyage réalisé – salle de bain" },
  { src: "/images/WhatsApp Image3.jpeg",  alt: "Nettoyage réalisé – chambre" },
  { src: "/images/balcon.jpeg",            alt: "Nettoyage réalisé – balcon" },
];

/* ── Lightbox overlay ── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain animate-lightbox-in"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/80 hover:text-white text-3xl font-light transition-colors"
        aria-label="Fermer"
      >
        ✕
      </button>
    </div>
  );
}

export default function Realisations() {
  useRevealOnView();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section
      id="realisations"
      className="h-full bg-sage/40 bg-grain relative overflow-y-auto"
      data-scroll-inner
    >
      <div className="flex items-start">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16">
          {/* Title */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dark-deep">
              Réalisations
            </h2>
            <p className="text-dark/60 mt-2">
              Résultats constatables. Bureaux • Airbnb • Particuliers —
              Marseille &amp; alentours.
            </p>
          </div>

          {/* Photo grid — 5 photos: 2 cols top row, 3 cols bottom */}
          <div
            data-reveal
            className="grid gap-4 md:gap-5"
          >
            {/* Top row — 2 large images */}
            <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2">
              {photos.slice(0, 2).map((p) => (
                <figure
                  key={p.src}
                  className="rounded-2xl overflow-hidden border border-dark/8 bg-white/60 shadow-sm cursor-zoom-in"
                  onClick={() => setLightbox(p)}
                >
                  <img
                    className="reveal-media w-full h-[260px] md:h-[340px] object-cover hover:scale-105 transition-transform duration-500"
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>

            {/* Bottom row — 3 smaller images */}
            <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-3">
              {photos.slice(2).map((p) => (
                <figure
                  key={p.src}
                  className="rounded-2xl overflow-hidden border border-dark/8 bg-white/60 shadow-sm cursor-zoom-in"
                  onClick={() => setLightbox(p)}
                >
                  <img
                    className="reveal-media w-full h-[220px] md:h-[260px] object-cover hover:scale-105 transition-transform duration-500"
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mt-10 border border-dark/10 rounded-2xl bg-white/50 backdrop-blur-sm p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-dark-deep">Process simple</h3>
            <ol className="mt-4 grid gap-3 md:grid-cols-3 text-dark/70">
              <li>
                <span className="text-dark-deep font-semibold">1.</span> Vous
                décrivez (type + surface + urgence)
              </li>
              <li>
                <span className="text-dark-deep font-semibold">2.</span> Je confirme
                prix &amp; créneau sur WhatsApp
              </li>
              <li>
                <span className="text-dark-deep font-semibold">3.</span>{" "}
                Intervention + contrôle qualité
              </li>
            </ol>
            <p className="mt-4 text-dark/50 text-sm">
              Facture possible • Matériel pro • Discrétion Airbnb
            </p>
          </div>
        </div>
      </div>
      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}
    </section>
  );
}
