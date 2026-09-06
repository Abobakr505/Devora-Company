import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function WhyDevora() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal("[data-reveal]");

  return (
    <section className="relative py-28 md:py-36 bg-ink-900/30">
      <div className="container-devora">
        <div className="mb-16" data-reveal ref={revealRef}>
          <p className="section-label mb-6">{t.whyDevora.label}</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-mist-100 max-w-2xl">
            {t.whyDevora.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {t.whyDevora.items.map((reason) => (
            <div
              key={reason.index}
              data-reveal
              className="group py-8 border-t border-white/[0.06] first:md:border-t last:border-b md:[&:nth-child(-n+3)]:border-t [&:nth-last-child(-n+2)]:border-b md:[&:nth-last-child(-n+3)]:border-b"
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-display text-sm text-mist-700 group-hover:text-emerald-500 transition-colors duration-300">
                  {reason.index}
                </span>
              </div>
              <h3 className="font-display text-2xl text-mist-100 mb-2">
                {reason.title}
              </h3>
              <p className="text-mist-500 leading-relaxed max-w-xs">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
