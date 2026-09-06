import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function NotFound() {
  const { t } = useLanguage();
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        "[data-error-number]",
        {
          opacity: 0,
          scale: 0.7,
          rotate: -8,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
        }
      )
        .fromTo(
          "[data-error-content]",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .fromTo(
          "[data-error-actions]",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .fromTo(
          "[data-error-shape]",
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          "-=0.8"
        );

      gsap.to("[data-float='1']", {
        y: -20,
        x: 12,
        rotate: 8,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-float='2']", {
        y: 18,
        x: -10,
        rotate: -10,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-grid bg-ink-950 flex items-center justify-center pt-20 pb-16 sm:pt-32 sm:pb-24 "
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-600/[0.10] blur-[140px]" />
      </div>

      {/* Decorative shapes */}
      <div
        data-error-shape
        data-float="1"
        className="pointer-events-none absolute top-[18%] right-[12%] w-24 h-24 border border-emerald-500/20 rounded-3xl rotate-12 opacity-0"
      />

      <div
        data-error-shape
        data-float="2"
        className="pointer-events-none absolute bottom-[18%] left-[10%] w-16 h-16 border border-emerald-500/20 rounded-full opacity-0"
      />

      <div
        data-error-shape
        className="pointer-events-none absolute top-[25%] left-[20%] w-5 h-5 bg-emerald-500/20 rounded rotate-45 opacity-0"
      />

      <div className="relative z-10 container-devora text-center px-6">
        {/* 404 */}
        <div
          data-error-number
          className="opacity-0 select-none font-display font-medium leading-none"
        >
          <span className="text-[clamp(8rem,25vw,22rem)] text-transparent bg-clip-text bg-gradient-to-b from-mist-100 via-mist-300 to-emerald-500/20">
            404
          </span>
        </div>

        {/* Content */}
        <div
          data-error-content
          className="opacity-0 max-w-xl mx-auto -mt-6 sm:-mt-10"
        >
          <p className="section-label mb-5">{t.notFound.label}</p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-mist-100">
            {t.notFound.title}
          </h1>

          <p className="mt-5 text-mist-500 text-base sm:text-lg leading-relaxed">
            {t.notFound.description}
          </p>
        </div>

        {/* Actions */}
        <div
          data-error-actions
          className="opacity-0 mt-9 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 text-ink-950 font-medium px-7 py-3.5 hover:bg-emerald-400 transition-colors duration-300"
          >
            <Home size={18} />

            {t.notFound.home}

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-mist-100 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors duration-300"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180"
            />

            {t.notFound.back}
          </button>
        </div>

        {/* Bottom label */}
        <p className="mt-14 text-xs tracking-[0.25em] text-mist-700 uppercase">
          {t.notFound.tagline}
        </p>
      </div>
    </main>
  );
}
