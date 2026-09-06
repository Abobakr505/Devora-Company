import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Languages } from "lucide-react";
import Logo from "../Logo/Logo.jsx";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function Navbar() {
  const { t, toggleLang } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  // =========================
  // Scroll effect
  // =========================
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // =========================
  // Mobile menu animation
  // =========================
  useEffect(() => {
    if (!menuRef.current) return;

    if (open) {
      document.body.style.overflow = "hidden";

      // Menu reveal
      gsap.fromTo(
        menuRef.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power4.inOut",
        }
      );

      // Menu links animation
      gsap.fromTo(
        menuRef.current.querySelectorAll("[data-menu-link]"),
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.25,
          ease: "power3.out",
        }
      );
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // =========================
  // Navigation
  // =========================
  const handleNav = (href) => {
    setOpen(false);

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-signature ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="container-devora">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ease-signature ${
              scrolled
                ? "bg-ink-900/70 backdrop-blur-xl border border-white/[0.06] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* =========================
                LOGO
            ========================== */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#home");
              }}
              className="flex items-center gap-2.5"
            >
              <Logo size={28} />

              <span className="font-display text-lg tracking-wide text-mist-100">
                DEVORA
              </span>
            </a>

            {/* =========================
                DESKTOP NAVIGATION
            ========================== */}
            <nav className="hidden lg:flex items-center gap-8">
              {t.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="text-sm text-mist-300 hover:text-mist-100 transition-colors relative group"
                >
                  {link.label}

                  <span className="absolute -bottom-1 start-0 w-0 h-px bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* =========================
                DESKTOP ACTIONS
            ========================== */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language */}
              <button
                onClick={toggleLang}
                className="lang inline-flex items-center gap-1.5 text-sm text-mist-300 hover:text-emerald-400 transition-colors px-2 py-2"
                aria-label="Toggle language"
              >
                <Languages size={16} />

                {t.nav.langToggle}
              </button>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav("#contact");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/[0.08] px-5 py-2.5 text-sm text-emerald-400 hover:bg-emerald-500/[0.16] hover:border-emerald-500/70 transition-all duration-300"
              >
                {t.nav.cta}
              </a>
            </div>

            {/* =========================
                MOBILE ACTIONS
            ========================== */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Mobile Language */}
              <button
                onClick={toggleLang}
                className="lang flex items-center gap-2 text-mist-300 hover:text-emerald-400 transition-colors"
                aria-label="Toggle language"
              >
                <Languages size={18} />

                <span className="text-sm">
                  {t.nav.langToggle}
                </span>
              </button>

              {/* =========================
                  HAMBURGER / X
              ========================== */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className="relative flex h-10 w-10 items-center justify-center text-mist-100"
              >
                <span className="sr-only">
                  {open ? "Close menu" : "Open menu"}
                </span>

                {/* TOP LINE */}
                <span
                  aria-hidden="true"
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    h-[1.5px]
                    w-6
                    -translate-x-1/2
                    bg-current
                    origin-center
                    transition-all
                    duration-300
                    ease-in-out
                    ${
                      open
                        ? "rotate-45"
                        : "-translate-y-2"
                    }
                  `}
                />

                {/* MIDDLE LINE */}
                <span
                  aria-hidden="true"
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    h-[1.5px]
                    w-6
                    -translate-x-1/2
                    bg-current
                    origin-center
                    transition-all
                    duration-200
                    ease-in-out
                    ${
                      open
                        ? "opacity-0 scale-x-0"
                        : "opacity-100 scale-x-100"
                    }
                  `}
                />

                {/* BOTTOM LINE */}
                <span
                  aria-hidden="true"
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    h-[1.5px]
                    w-6
                    -translate-x-1/2
                    bg-current
                    origin-center
                    transition-all
                    duration-300
                    ease-in-out
                    ${
                      open
                        ? "-rotate-45"
                        : "translate-y-2"
                    }
                  `}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <div
        ref={menuRef}
        className={`
          fixed
          inset-0
          z-40
          bg-ink-950
          lg:hidden
          ${
            open
              ? "pointer-events-auto"
              : "pointer-events-none opacity-0"
          }
        `}
        style={{
          clipPath: open
            ? "inset(0% 0% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
        }}
      >
        <div className="h-full flex flex-col justify-center px-8">
          <nav className="flex flex-col gap-6">
            {/* Mobile Links */}
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                data-menu-link
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="font-display text-4xl text-mist-100 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <a
              data-menu-link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/[0.08] px-6 py-3 text-emerald-400 hover:bg-emerald-500/[0.16] transition-all duration-300"
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}