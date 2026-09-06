import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal("[data-reveal]");
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const counters = el.querySelectorAll("[data-count]");
    if (prefersReduced) {
      counters.forEach((c) => (c.textContent = c.dataset.count));
      return;
    }

    const ctx = gsap.context(() => {
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.count, 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val).toString();
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [t]);

  return (
    <section id="about" className="relative py-28 md:py-36 bg-ink-950">
      <div className="container-devora">
        <div ref={revealRef} className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-7" data-reveal>
            <p className="section-label mb-6">{t.about.label}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-mist-100 leading-[1.05]">
              {t.about.title[0]}
              <br />
              {t.about.title[1]}
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end" data-reveal>
            {t.about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-mist-500 text-lg leading-relaxed ${i > 0 ? "mt-4" : ""}`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 border-t border-white/[0.06] pt-12"
        >
          {t.stats.map((stat) => (
            <div key={stat.label} data-reveal>
              <div className="font-display text-4xl sm:text-5xl text-emerald-400">
                <span data-count={stat.value}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm text-mist-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}