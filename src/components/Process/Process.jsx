import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const { t } = useLanguage();
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const steps = t.process.steps;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const items = el.querySelectorAll("[data-process-item]");
    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, el);

    return () => ctx.revert();
  }, [t]);

  return (
    <section id="process" ref={rootRef} className="relative py-28 md:py-36 bg-ink-950">
      <div className="container-devora">
        <div className="mb-16">
          <p className="section-label mb-6">{t.process.label}</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-mist-100">
            {t.process.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32">
              <div className="font-display text-8xl text-emerald-500/20">
                {steps[active].index}
              </div>
              <h3 className="font-display text-3xl text-mist-100 mt-4">
                {steps[active].title}
              </h3>
              <p className="text-mist-500 mt-3 max-w-xs leading-relaxed">
                {steps[active].description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            {steps.map((step, i) => (
              <div
                key={step.index}
                data-process-item
                className={`py-8 md:py-10 border-t border-white/[0.06] last:border-b transition-opacity duration-500 ${
                  active === i ? "opacity-100" : "opacity-40 lg:opacity-40"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span
                    className={`font-display text-lg transition-colors duration-500 ${
                      active === i ? "text-emerald-400" : "text-mist-700"
                    }`}
                  >
                    {step.index}
                  </span>
                  <div>
                    <h4 className="font-display text-2xl sm:text-3xl text-mist-100">
                      {step.title}
                    </h4>
                    <p className="text-mist-500 mt-2 max-w-md leading-relaxed lg:hidden">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}