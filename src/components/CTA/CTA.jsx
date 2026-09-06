import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function CTA() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal("[data-reveal]");

  return (
    <section className="relative py-32 md:py-44 bg-ink-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-600/[0.1] blur-[160px]" />
      </div>

      <div ref={revealRef} className="container-devora relative text-center">
        <h2
          data-reveal
          className="font-display text-4xl sm:text-6xl md:text-7xl text-mist-100 leading-[1.02] max-w-4xl mx-auto glow-text"
        >
          {t.cta.title}
        </h2>
        <p
          data-reveal
          className="mt-6 text-lg text-mist-500 max-w-lg mx-auto"
        >
          {t.cta.description}
        </p>
        <a
          data-reveal
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-emerald-500 text-ink-950 font-medium px-8 py-4 hover:bg-emerald-400 transition-colors duration-300"
        >
          {t.cta.button}
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
        </a>
      </div>
    </section>
  );
}