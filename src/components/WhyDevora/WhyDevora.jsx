import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function WhyDevora() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal("[data-reveal]");

  return (
    <section className="relative overflow-hidden py-28 md:py-36 bg-ink-900/30">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.045] blur-[140px]" />

        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-400/[0.035] blur-[130px]" />

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
        {/* Header */}
        <div
          ref={revealRef}
          data-reveal
          className="mb-16 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-emerald-500" />

              <p className="section-label">
                {t.whyDevora.label}
              </p>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-mist-100 leading-[0.98] tracking-tight">
              {t.whyDevora.title}
            </h2>
          </div>

          <div className="hidden lg:block text-right">
            <span className="font-display text-7xl text-white/[0.025]">
              WHY
            </span>
          </div>
        </div>

        {/* Reasons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.whyDevora.items.map((reason, index) => (
            <div
              key={reason.index}
              data-reveal
              className="
                group relative
                min-h-[300px]
                overflow-hidden
                rounded-2xl
                border border-white/[0.07]
                bg-white/[0.025]
                backdrop-blur-xl
                p-6 md:p-8
                flex flex-col justify-between
                transition-all duration-500
                hover:-translate-y-2
                hover:border-emerald-500/25
                hover:bg-white/[0.04]
                hover:shadow-2xl
                hover:shadow-black/20
              "
            >
              {/* Background number */}
              <span
                className="
                  pointer-events-none
                  absolute -right-4 -top-10
                  font-display
                  text-[150px]
                  leading-none
                  text-white/[0.025]
                  transition-all duration-700
                  group-hover:text-emerald-500/[0.06]
                  group-hover:scale-110
                "
              >
                {reason.index}
              </span>

              {/* Glow */}
              <div
                className="
                  pointer-events-none
                  absolute -right-20 -top-20
                  h-48 w-48
                  rounded-full
                  bg-emerald-500/[0.08]
                  blur-[70px]
                  opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
              />

              {/* Top */}
              <div className="relative">
                <div className="flex items-center justify-between mb-10">
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      border border-white/[0.08]
                      bg-white/[0.025]
                      transition-all duration-500
                      group-hover:border-emerald-500/25
                      group-hover:bg-emerald-500/10
                    "
                  >
                    <span className="font-display text-sm text-mist-500 transition-colors duration-300 group-hover:text-emerald-400">
                      {reason.index}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-mist-700">
                    DEVORA
                  </span>
                </div>

                <h3
                  className="
                    font-display
                    text-2xl md:text-3xl
                    text-mist-100
                    leading-tight
                    mb-4
                    transition-colors duration-300
                    group-hover:text-emerald-50
                  "
                >
                  {reason.title}
                </h3>

                <p className="text-mist-500 leading-relaxed max-w-sm">
                  {reason.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="relative mt-10 flex items-center gap-3">
                <span
                  className="
                    h-px w-8
                    bg-emerald-500/30
                    transition-all duration-500
                    group-hover:w-16
                    group-hover:bg-emerald-500
                  "
                />

                <span className="text-[10px] uppercase tracking-[0.18em] text-mist-700 transition-colors duration-300 group-hover:text-emerald-500/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Bottom accent */}
              <div
                className="
                  absolute bottom-0 left-0
                  h-[2px] w-0
                  bg-emerald-500
                  transition-all duration-500
                  group-hover:w-full
                "
              />
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div
          data-reveal
          className="
            mt-6
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
              {t.whyDevora.footer}
            </span>
          </div>

          <span className="text-xs uppercase tracking-[0.18em] text-mist-700">
            DEVORA / DIFFERENCE
          </span>
        </div>
      </div>
    </section>
  );
}
