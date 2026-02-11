import {
  PropsWithChildren,
  useRef,
  useState,
  useEffect,
  useCallback,
  Children,
} from "react";

const SLIDE_LABELS = ["Accueil", "Réalisations", "Contact"];

interface Props extends PropsWithChildren {
  locked?: boolean;
}

export default function ScrollSlider({ children, locked = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slideCount = Children.count(children);

  // Track active slide via native scroll position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const width = el.clientWidth;
      const idx = Math.round(scrollLeft / width);
      setActive(Math.max(0, Math.min(idx, slideCount - 1)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slideCount]);

  // Lock scroll during intro
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.overflow = locked ? "hidden" : "";
  }, [locked]);

  // Navigate to slide
  const goTo = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el || locked) return;
      const clamped = Math.max(0, Math.min(index, slideCount - 1));
      el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    },
    [locked, slideCount]
  );

  // Convert vertical wheel → horizontal slide navigation (smooth, debounced)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelAccum = 0;
    let wheelTimer: ReturnType<typeof setTimeout>;
    let cooldown = false;

    const onWheel = (e: WheelEvent) => {
      if (locked || cooldown) {
        e.preventDefault();
        return;
      }

      // Check if we're inside a vertically-scrollable child
      const target = e.target as HTMLElement;
      const scrollableParent = target.closest("[data-scroll-inner]") as HTMLElement | null;
      if (scrollableParent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2;

        if (e.deltaY < 0 && !atTop) return;
        if (e.deltaY > 0 && !atBottom) return;
      }

      e.preventDefault();

      wheelAccum += e.deltaY;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAccum = 0; }, 150);

      // Threshold before triggering a slide change
      if (Math.abs(wheelAccum) > 80) {
        const dir = wheelAccum > 0 ? 1 : -1;
        const currentIdx = Math.round(el.scrollLeft / el.clientWidth);
        const next = Math.max(0, Math.min(currentIdx + dir, slideCount - 1));

        el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
        wheelAccum = 0;

        // Cooldown to prevent rapid-fire slides
        cooldown = true;
        setTimeout(() => { cooldown = false; }, 900);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [locked, slideCount]);

  // Keyboard: left/right arrows
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (locked) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, goTo, locked]);

  return (
    <>
      {/* Horizontal scroll container with snap */}
      <div
        ref={containerRef}
        className="h-screen flex overflow-x-auto overflow-y-hidden scroll-smooth bg-cream text-dark-deep"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {Children.map(children, (child, i) => (
          <div
            key={i}
            className="h-screen min-w-full w-full flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation dots — bottom center */}
      {!locked && (
        <nav
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg border border-dark/8"
          aria-label="Navigation des slides"
        >
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={SLIDE_LABELS[i] || `Slide ${i + 1}`}
              className="group relative flex flex-col items-center gap-1"
            >
              {/* Dot */}
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-8 h-2 bg-mint-dark rounded-full"
                    : "w-2 h-2 bg-dark/20 hover:bg-dark/40"
                }`}
              />
              {/* Label below dot */}
              <span
                className={`text-[10px] tracking-wide transition-all duration-300 ${
                  i === active ? "text-dark-deep font-medium" : "text-dark/0 group-hover:text-dark/50"
                }`}
              >
                {SLIDE_LABELS[i]}
              </span>
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
