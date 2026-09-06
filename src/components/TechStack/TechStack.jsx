import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function TechStack() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal("[data-reveal]");

  return (
    <section className="relative py-28 md:py-36 bg-ink-900/30">
      <div className="container-devora">
        <div className="mb-16" data-reveal ref={revealRef}>
          <p className="section-label mb-6">{t.techStack.label}</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-mist-100 max-w-2xl">
            {t.techStack.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.techStack.groups.map((group) => (
            <div key={group.group} data-reveal>
              <p className="text-emerald-500/80 text-sm tracking-wide mb-4">
                {group.group}
              </p>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-display text-xl text-mist-300 hover:text-mist-100 transition-colors duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}