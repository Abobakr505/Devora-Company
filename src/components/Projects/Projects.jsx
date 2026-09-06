import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import { getProjects } from "../../data/projectdetails.js";

export default function Projects() {
  const { t, lang } = useLanguage();
  const projects = getProjects(lang);

  const revealRef = useScrollReveal("[data-reveal]", {
    y: 50,
    stagger: 0.12,
  });

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-28 md:py-36 bg-ink-950"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 start-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.035] blur-[140px]" />
        <div className="absolute bottom-0 end-0 w-[450px] h-[450px] rounded-full bg-emerald-400/[0.025] blur-[130px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.18]" />
      </div>

      <div className="container-devora relative z-10">

        {/* ================= HEADER ================= */}
        <div
          data-reveal
          ref={revealRef}
          className="mb-16 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-emerald-400" />
              <p className="section-label !mb-0">
                {t.projects.label}
              </p>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-mist-100">
              {t.projects.title}
            </h2>
          </div>

          <div className="hidden lg:block max-w-xs">
            <p className="text-sm leading-7 text-mist-500">
              {t.projects.description}
            </p>
          </div>
        </div>

        {/* ================= PROJECTS ================= */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              data-reveal
              className="
                group relative block overflow-hidden rounded-[2rem]
                border border-white/[0.07]
                bg-ink-900/40
                transition-all duration-700
                hover:-translate-y-2
                hover:border-emerald-400/30
                hover:shadow-[0_30px_80px_-35px_rgba(52,211,153,0.35)]
              "
            >
              {/* ================= VISUAL ================= */}
              <div
                className={`
                  relative h-[300px] sm:h-[350px]
                  overflow-hidden
                  bg-gradient-to-br ${project.gradient}
                `}
              >
                {/* Grid */}
                <div className="absolute inset-0 bg-grid opacity-30" />

                {/* Dark overlay */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                  transition-opacity duration-700
                  group-hover:opacity-70
                " />

                {/* Glow */}
                <div className="
                  absolute -bottom-24 -end-24
                  w-72 h-72
                  rounded-full
                  bg-emerald-400/10
                  blur-[90px]
                  transition-all duration-700
                  group-hover:bg-emerald-400/20
                  group-hover:scale-125
                " />

                {/* Giant number */}
                <span className="
                  absolute -top-8 -end-4
                  font-display
                  text-[150px]
                  sm:text-[180px]
                  leading-none
                  text-white/[0.045]
                  select-none
                  transition-all duration-700
                  group-hover:text-white/[0.08]
                  group-hover:translate-x-3
                ">
                  {project.index}
                </span>

                {/* Project number */}
                <div className="
                  absolute top-6 start-6
                  flex items-center gap-2
                  text-xs tracking-[0.2em]
                  uppercase
                  text-mist-300/70
                ">
                  <span className="w-5 h-px bg-emerald-400/70" />
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Arrow */}
                <div className="
                  absolute top-5 end-5
                  w-12 h-12
                  rounded-full
                  border border-white/10
                  bg-black/10
                  backdrop-blur-md
                  flex items-center justify-center
                  text-mist-100
                  transition-all duration-500
                  group-hover:bg-emerald-400
                  group-hover:text-ink-950
                  group-hover:border-emerald-400
                  group-hover:rotate-0
                ">
                  <ArrowUpRight
                    size={21}
                    className="
                      transition-transform duration-500
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      rtl:-scale-x-100
                    "
                  />
                </div>

                {/* Bottom content */}
                <div className="
                  absolute bottom-0 start-0 end-0
                  p-7 sm:p-8
                  translate-y-2
                  transition-transform duration-500
                  group-hover:translate-y-0
                ">
                  <div className="
                    inline-flex items-center
                    rounded-full
                    border border-white/10
                    bg-black/20
                    backdrop-blur-md
                    px-3 py-1.5
                    mb-3
                  ">
                    <span className="text-xs text-emerald-300">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="
                    font-display
                    text-3xl sm:text-4xl lg:text-[2.6rem]
                    leading-none
                    text-white
                    tracking-tight
                  ">
                    {project.name}
                  </h3>
                </div>
              </div>

              {/* ================= INFO ================= */}
              <div className="relative p-7 sm:p-8">

                {/* Top line */}
                <div className="
                  absolute top-0 start-8 end-8
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-emerald-400/30
                  to-transparent
                  opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                " />

                <div className="flex flex-col gap-6">

                  {/* Description */}
                  <p className="
                    text-sm sm:text-[15px]
                    leading-7
                    text-mist-500
                    max-w-xl
                    transition-colors duration-500
                    group-hover:text-mist-400
                  ">
                    {project.description}
                  </p>

                  {/* Technologies + View */}
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="
                            rounded-full
                            border border-white/[0.08]
                            bg-white/[0.025]
                            px-3 py-1.5
                            text-[11px]
                            text-mist-500
                            transition-all duration-300
                            group-hover:border-white/[0.12]
                            group-hover:text-mist-300
                          "
                        >
                          {tech}
                        </span>
                      ))}

                      {project.tech.length > 4 && (
                        <span className="
                          rounded-full
                          border border-white/[0.08]
                          px-3 py-1.5
                          text-[11px]
                          text-mist-600
                        ">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View project */}
                    <div className="
                      shrink-0
                      flex items-center gap-2
                      text-xs
                      uppercase
                      tracking-[0.16em]
                      text-mist-500
                      transition-colors duration-300
                      group-hover:text-emerald-400
                    ">
                      <span>{t.projects.view}</span>

                      <MoveUpRight
                        size={14}
                        className="
                          transition-transform duration-500
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                          rtl:-scale-x-100
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover border accent */}
              <div className="
                absolute bottom-0 start-1/2
                h-[2px] w-0
                -translate-x-1/2
                bg-emerald-400
                transition-all duration-700
                group-hover:w-1/3
              " />
            </Link>
          ))}
        </div>

        {/* ================= BOTTOM STATEMENT ================= */}
        <div
          data-reveal
          className="
            mt-16 md:mt-20
            flex items-center justify-center
            gap-4
            text-center
          "
        >
          <span className="h-px w-12 bg-white/10" />

          <p className="text-xs sm:text-sm text-mist-600">
            {t.projects.footer}
          </p>

          <span className="h-px w-12 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
