import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import { getProjects } from "../../data/projectdetails.js";

export default function Projects() {
  const { t, lang } = useLanguage();
  const projects = getProjects(lang);
  const revealRef = useScrollReveal("[data-reveal]", { y: 40, stagger: 0.12 });

  return (
    <section id="projects" className="relative py-28 md:py-36 bg-ink-950">
      <div className="container-devora">
        <div className="mb-16" data-reveal ref={revealRef}>
          <p className="section-label mb-6">{t.projects.label}</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-mist-100">
            {t.projects.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              data-reveal
              className="group relative rounded-3xl border border-white/[0.06] overflow-hidden bg-ink-900/40 hover:border-emerald-500/30 transition-colors duration-500"
            >
              <div
                className={`relative h-64 sm:h-72 bg-gradient-to-br ${project.gradient} overflow-hidden`}
              >
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute top-6 start-6 font-display text-sm text-mist-500">
                  {project.index}
                </div>
                <div className="absolute bottom-6 start-6 end-6">
                  <h3 className="font-display text-3xl sm:text-4xl text-mist-100">
                    {project.name}
                  </h3>
                  <p className="text-emerald-400/90 text-sm mt-1">
                    {project.category}
                  </p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="absolute top-6 end-6 text-mist-100 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100"
                />
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-mist-500 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs rounded-full border border-white/10 text-mist-500 px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
