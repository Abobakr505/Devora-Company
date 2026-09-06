import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function TechStack() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal("[data-reveal]");

  return (
    <section className="relative overflow-hidden py-28 md:py-36 bg-ink-900/30">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.06] blur-[130px]" />

        <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-emerald-400/[0.04] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="container-devora relative z-10">
        {/* Header */}
        <div
          ref={revealRef}
          data-reveal
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-emerald-500" />

            <p className="section-label">
              {t.techStack.label}
            </p>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-mist-100">
            {t.techStack.title}
          </h2>

          <p className="mt-6 max-w-2xl text-mist-500 text-base md:text-lg leading-relaxed">
            {t.techStack.description}
          </p>
        </div>

        {/* Stack Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {t.techStack.groups.map((group, index) => (
            <div
              key={group.group}
              data-reveal
              className="
                group relative overflow-hidden
                min-h-[280px]
                rounded-2xl
                border border-white/[0.07]
                bg-white/[0.025]
                backdrop-blur-xl
                p-6 md:p-7
                transition-all duration-500
                hover:-translate-y-2
                hover:border-emerald-500/25
                hover:bg-white/[0.04]
                hover:shadow-2xl
                hover:shadow-black/20
              "
            >
              {/* Glow */}
              <div
                className="
                  pointer-events-none
                  absolute -right-20 -top-20
                  h-44 w-44
                  rounded-full
                  bg-emerald-500/[0.08]
                  blur-[70px]
                  opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
              />

              {/* Number */}
              <div className="relative flex items-center justify-between mb-8">
                <span
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    border border-emerald-500/15
                    bg-emerald-500/[0.07]
                    text-xs font-medium
                    text-emerald-400
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="h-px flex-1 ml-4 bg-white/[0.07]" />
              </div>

              {/* Group */}
              <div className="relative mb-6">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-500/80">
                  {group.group}
                </p>
              </div>

              {/* Items */}
              <ul className="relative space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="
                      group/item
                      flex items-center gap-3
                      font-display
                      text-lg md:text-xl
                      text-mist-400
                      transition-all duration-300
                      hover:text-mist-100
                      hover:translate-x-1
                    "
                  >
                    <span
                      className="
                        h-1.5 w-1.5 shrink-0
                        rounded-full
                        bg-mist-700
                        transition-all duration-300
                        group-hover/item:bg-emerald-400
                        group-hover/item:scale-125
                      "
                    />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div
                className="
                  absolute bottom-0 left-0
                  h-px w-0
                  bg-emerald-500
                  transition-all duration-500
                  group-hover:w-full
                "
              />
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div
          data-reveal
          className="
            mt-8 md:mt-10
            rounded-2xl
            border border-white/[0.06]
            bg-white/[0.02]
            px-6 py-5
            flex flex-col sm:flex-row
            items-start sm:items-center
            justify-between
            gap-4
          "
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-sm text-mist-500">
              {t.techStack.footer}
            </span>
          </div>

          <span className="text-xs uppercase tracking-[0.15em] text-mist-700">
            DEVORA / TECH STACK
          </span>
        </div>
      </div>
    </section>
  );
}
