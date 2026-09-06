import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function TechMarquee() {
  const { t } = useLanguage();
  const row = [...t.techMarquee, ...t.techMarquee];

  return (
    <section className="relative py-14 border-y border-white/[0.06] bg-ink-900/40 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 25s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div className="container-devora mb-6">
        <p className="section-label">{t.techMarqueeLabel}</p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent z-10" />
        <div className="flex gap-16 whitespace-nowrap marquee-track">
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-display text-2xl sm:text-3xl text-mist-700 hover:text-emerald-500 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}