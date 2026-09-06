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
      counters.forEach((counter) => {
        counter.textContent = counter.dataset.count;
      });

      return;
    }

    const ctx = gsap.context(() => {
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.count, 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power3.out",

          scrollTrigger: {
            trigger: counter,
            start: "top 88%",
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
    <section
      id="about"
      className="relative overflow-hidden py-28 md:py-36 bg-ink-950"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.05] blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-emerald-400/[0.035] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-devora relative z-10">
        {/* Top Content */}
        <div
          ref={revealRef}
          className="grid lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* Heading */}
          <div className="lg:col-span-7" data-reveal>
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-emerald-500" />

              <p className="section-label">
                {t.about.label}
              </p>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-mist-100 leading-[0.98] tracking-tight">
              {t.about.title[0]}
              <br />

              <span className="text-mist-500">
                {t.about.title[1]}
              </span>
            </h2>
          </div>

          {/* Description */}
          <div
            className="lg:col-span-5 flex flex-col justify-end"
            data-reveal
          >
            <div className="relative pl-6 border-l border-emerald-500/30">
              <span className="absolute -left-[4px] top-0 h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30" />

              {t.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`
                    text-mist-500
                    text-base md:text-lg
                    leading-relaxed
                    ${i > 0 ? "mt-5" : ""}
                  `}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          data-reveal
          className="my-16 md:my-20 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        />

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05]"
        >
          {t.stats.map((stat, index) => (
            <div
              key={stat.label}
              data-reveal
              className="
                group relative
                min-h-[190px]
                md:min-h-[220px]
                bg-ink-950/90
                p-6 md:p-8
                flex flex-col justify-between
                overflow-hidden
                transition-all duration-500
                hover:bg-white/[0.025]
              "
            >
              {/* Glow */}
              <div
                className="
                  pointer-events-none
                  absolute -right-16 -top-16
                  h-40 w-40
                  rounded-full
                  bg-emerald-500/[0.08]
                  blur-[60px]
                  opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
              />

              {/* Number */}
              <div className="relative flex items-start justify-between">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl text-mist-100 tracking-tight">
                  <span
                    data-count={stat.value}
                    className="transition-colors duration-300 group-hover:text-emerald-400"
                  >
                    0
                  </span>

                  <span className="text-emerald-500">
                    {stat.suffix}
                  </span>
                </div>

                <span className="text-[10px] tracking-[0.18em] text-mist-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Label */}
              <div className="relative">
                <div className="mb-3 h-px w-8 bg-emerald-500/40 transition-all duration-500 group-hover:w-14 group-hover:bg-emerald-500" />

                <p className="text-sm text-mist-600 transition-colors duration-300 group-hover:text-mist-400">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div
          data-reveal
          className="
            mt-8
            flex flex-col sm:flex-row
            items-start sm:items-center
            justify-between
            gap-5
            rounded-2xl
            border border-white/[0.06]
            bg-white/[0.02]
            px-6 py-5 md:px-7
          "
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-sm text-mist-500">
              {t.about.footer}
            </span>
          </div>

          <span className="text-xs uppercase tracking-[0.18em] text-mist-700">
            DEVORA / ABOUT
          </span>
        </div>
      </div>
    </section>
  );
}
