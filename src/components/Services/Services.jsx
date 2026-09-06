import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function Services() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal("[data-reveal]");
  const [active, setActive] = useState(null);

  return (
    <section id="services" className="relative py-28 md:py-36 bg-ink-900/30">
      <div className="container-devora">
        <div className="flex items-end justify-between mb-16" data-reveal ref={revealRef}>
          <div>
            <p className="section-label mb-6">{t.services.label}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-mist-100">
              {t.services.title}
            </h2>
          </div>
        </div>

        <div className="border-t border-white/[0.06]">
          {t.services.items.map((service, i) => (
            <div
              key={service.index}
              data-reveal
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative border-b border-white/[0.06] py-8 md:py-10 transition-colors duration-500"
            >
              <div className="flex items-center gap-6 md:gap-12">
                <span
                  className={`font-display text-lg transition-colors duration-500 ${
                    active === i ? "text-emerald-400" : "text-mist-700"
                  }`}
                >
                  {service.index}
                </span>

                <div className="flex-1">
                  <h3
                    className={`font-display text-2xl sm:text-3xl md:text-4xl transition-all duration-500 ${
                      active === i
                        ? "text-mist-100 translate-x-2 rtl:-translate-x-2"
                        : "text-mist-300"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <div
                    className={`grid transition-all duration-500 ease-signature ${
                      active === i
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-mist-500 max-w-lg">
                        {service.description}
                      </p>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs rounded-full border border-emerald-500/25 text-emerald-500/80 px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <ArrowUpRight
                  size={28}
                  className={`shrink-0 transition-all duration-500 rtl:-scale-x-100 ${
                    active === i
                      ? "text-emerald-400 rotate-0 opacity-100"
                      : "text-mist-700 -rotate-45 opacity-40"
                  }`}
                />
              </div>

              <div
                className={`absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/[0.06] to-transparent transition-opacity duration-500 rtl:bg-gradient-to-l ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}