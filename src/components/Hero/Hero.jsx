import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Logo from "../Logo/Logo.jsx";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function Hero() {
  const { t } = useLanguage();
  const rootRef = useRef(null);
  const shapeRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (!prefersReduced) {
        tl.fromTo(
          "[data-hero-logo]",
          { opacity: 0, scale: 0.7, rotate: -12 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.9 }
        )
          .fromTo(
            "[data-hero-word]",
            { opacity: 0, yPercent: 110 },
            { opacity: 1, yPercent: 0, duration: 1, stagger: 0.08 },
            "-=0.5"
          )
          .fromTo(
            "[data-hero-desc]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.5"
          )
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
            "-=0.45"
          )
          .fromTo(
            "[data-hero-scroll]",
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            "-=0.3"
          )
          .fromTo(
            "[data-hero-shape]",
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 1.2, stagger: 0.1 },
            "-=1"
          );

        // subtle floating geometry
        gsap.to("[data-float='1']", {
          y: -22,
          x: 10,
          rotate: 8,
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to("[data-float='2']", {
          y: 18,
          x: -14,
          rotate: -6,
          duration: 7.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      } else {
        gsap.set(
          "[data-hero-logo], [data-hero-word], [data-hero-desc], [data-hero-cta], [data-hero-scroll], [data-hero-shape]",
          { opacity: 1, y: 0, yPercent: 0, scale: 1, rotate: 0 }
        );
      }

      // mouse parallax
      if (!prefersReduced && rootRef.current) {
        const handleMove = (e) => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 2;
          const y = (e.clientY / innerHeight - 0.5) * 2;
          gsap.to(shapeRef.current, {
            x: x * 18,
            y: y * 18,
            duration: 1.2,
            ease: "power3.out",
          });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-grid bg-ink-950"
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-emerald-600/[0.12] blur-[140px]" />
      </div>

      {/* Floating geometric shapes */}
      <div ref={shapeRef} className="pointer-events-none absolute inset-0">
        <div
          data-hero-shape
          data-float="1"
          className="absolute top-[18%] right-[10%] w-24 h-24 border border-emerald-500/25 rounded-2xl rotate-12"
        />
        <div
          data-hero-shape
          data-float="2"
          className="absolute bottom-[22%] left-[8%] w-16 h-16 border border-emerald-500/20 rounded-full"
        />
        <div
          data-hero-shape
          className="absolute bottom-[12%] right-[18%] w-10 h-10 bg-emerald-500/10 rounded-lg rotate-45"
        />
      </div>

      <div className="container-devora relative z-10 pt-32 pb-20">
        <div data-hero-logo className="mb-8 opacity-0">
          <Logo size={56} />
        </div>

        <h1 className="font-display font-medium text-hero-sm sm:text-6xl md:text-7xl lg:text-hero-lg text-mist-100 glow-text ">
          <span className="block overflow-hidden">
            <span data-hero-word className="inline-block">
              {t.hero.lineOne}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-word className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 ">
              {t.hero.lineTwo}
            </span>
          </span>
        </h1>

        <p
          data-hero-desc
          className="opacity-0 mt-8 max-w-xl text-base sm:text-lg text-mist-500 leading-relaxed"
        >
          {t.hero.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            data-hero-cta
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="opacity-0 group inline-flex items-center gap-2 rounded-full bg-emerald-500 text-ink-950 font-medium px-7 py-3.5 hover:bg-emerald-400 transition-colors duration-300"
          >
            {t.hero.ctaPrimary}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
          </a>
          <a
            data-hero-cta
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="opacity-0 group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-mist-100 hover:border-emerald-500/60 hover:text-emerald-400 transition-colors duration-300"
          >
            {t.hero.ctaSecondary}
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>

      <div
        data-hero-scroll
        className="opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mist-700"
      >
        <span className="text-[11px] tracking-[0.2em]">{t.hero.scroll}</span>
        <span className="w-px h-10 bg-gradient-to-b from-emerald-500 to-transparent" />
      </div>
    </section>
  );
}