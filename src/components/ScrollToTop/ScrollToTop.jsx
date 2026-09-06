import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const CIRCUMFERENCE = 2 * Math.PI * 21;

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frameId;

    const updateScrollState = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

        setProgress(Math.min(Math.max(nextProgress, 0), 1));
        setVisible(window.scrollY > 420);
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`group fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-ink-900/85 text-emerald-400 shadow-[0_16px_45px_-18px_rgba(31,206,155,0.8)] backdrop-blur-xl transition-all duration-500 ease-signature hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-ink-800 hover:text-emerald-300 focus-visible:outline-none sm:bottom-8 sm:end-8 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-75 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="transition-[stroke-dashoffset] duration-300"
        />
      </svg>

      <ArrowUp
        aria-hidden="true"
        size={20}
        strokeWidth={1.8}
        className="relative transition-transform duration-300 group-hover:-translate-y-1"
      />
    </button>
  );
}