import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import {
  getProjectBySlug,
  getAdjacentProjects,
} from "../data/projectdetails.js";

export default function ProjectDetails() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();

  const project = getProjectBySlug(slug, lang);

  const revealRef = useScrollReveal("[data-reveal]", {
    y: 40,
    stagger: 0.1,
  });

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { previous, next } = getAdjacentProjects(slug, lang);

  return (
    <article className="min-h-screen bg-ink-950 text-mist-100 overflow-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Project gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/20 via-ink-950/70 to-ink-950" />

        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-emerald-500/[0.06] blur-[150px]" />

        <div
          ref={revealRef}
          className="container-devora relative z-10"
        >
          {/* Back */}
          <Link
            to="/#projects"
            data-reveal
            className="
              group
              inline-flex items-center gap-2
              text-mist-500
              hover:text-emerald-400
              transition-colors duration-300
              mb-12
            "
          >
            <ArrowLeft
              size={16}
              className="
                rtl:-scale-x-100
                transition-transform duration-300
                group-hover:-translate-x-1
                rtl:group-hover:translate-x-1
              "
            />

            {t.projectDetails.back}
          </Link>

          {/* Label */}
          <div
            data-reveal
            className="flex items-center gap-3 mb-7"
          >
            <span className="h-px w-10 bg-emerald-500" />

            <p className="section-label">
              {project.index} — {project.category}
            </p>
          </div>

          {/* Title */}
          <h1
            data-reveal
            className="
              font-display
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl
              leading-[0.9]
              tracking-tight
              text-mist-100
              max-w-5xl
            "
          >
            {project.name}
          </h1>

          {/* Description */}
          <p
            data-reveal
            className="
              mt-8
              max-w-2xl
              text-base md:text-lg
              leading-relaxed
              text-mist-400
            "
          >
            {project.description}
          </p>

          {/* Technologies */}
          <div
            data-reveal
            className="flex flex-wrap gap-2.5 mt-9"
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full
                  border border-white/10
                  bg-white/[0.035]
                  backdrop-blur-md
                  px-4 py-2
                  text-xs
                  text-mist-400
                  transition-colors duration-300
                  hover:border-emerald-500/30
                  hover:text-emerald-400
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HERO IMAGE
      ===================================================== */}
      <section className="relative z-10 -mt-8 md:-mt-16">
        <div className="container-devora">
          <div
            data-reveal
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border border-white/[0.08]
              bg-ink-900
              shadow-2xl
              shadow-black/40
              aspect-[16/9]
            "
          >
            {/* Image glow */}
            <div className="absolute -inset-10 bg-emerald-500/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <img
              src={project.heroImage}
              alt={project.name}
              className="
                relative z-10
                w-full h-full
                object-cover
                transition-transform duration-1000
                group-hover:scale-[1.025]
              "
              loading="eager"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent pointer-events-none" />

            {/* Corner label */}
            <div
              className="
                absolute
                bottom-5 left-5
                z-30
                hidden sm:flex
                items-center gap-2
                rounded-full
                border border-white/10
                bg-ink-950/60
                backdrop-blur-xl
                px-4 py-2
                text-xs text-mist-400
              "
            >
              <Sparkles size={13} className="text-emerald-400" />

              {project.category}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT INFO
      ===================================================== */}
      <section className="relative py-24 md:py-32">
        <div className="container-devora">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar */}
            <aside
              data-reveal
              className="lg:col-span-4"
            >
              <div
                className="
                  sticky top-28
                  rounded-2xl
                  border border-white/[0.07]
                  bg-white/[0.025]
                  backdrop-blur-xl
                  p-6 md:p-7
                "
              >
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-500/80 mb-7">
                  {t.projectDetails.info}
                </p>

                <div className="space-y-0">
                  <MetaItem
                    label={t.projectDetails.client}
                    value={project.client}
                  />

                  <MetaItem
                    label={t.projectDetails.year}
                    value={project.year}
                  />

                  <MetaItem
                    label={t.projectDetails.role}
                    value={project.role}
                  />

                  <MetaItem
                    label={t.projectDetails.duration}
                    value={project.duration}
                  />
                </div>

                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      mt-8
                      w-full
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-emerald-500
                      px-6 py-3.5
                      text-sm
                      font-semibold
                      text-ink-950
                      transition-all duration-300
                      hover:bg-emerald-400
                      hover:shadow-xl
                      hover:shadow-emerald-500/20
                    "
                  >
                    {t.projectDetails.visit}

                    <ExternalLink
                      size={16}
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </a>
                )}
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-8 space-y-20">
              {/* Challenge */}
              <ContentBlock
                number="01"
                title={t.projectDetails.challenge}
                text={project.challenge}
              />

              {/* Solution */}
              <ContentBlock
                number="02"
                title={t.projectDetails.solution}
                text={project.solution}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULTS
      ===================================================== */}
      {project.results?.length > 0 && (
        <section className="relative py-24 md:py-28 border-y border-white/[0.06] overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-emerald-500/[0.04] blur-[130px]" />

          <div className="container-devora relative z-10">
            <div
              data-reveal
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-emerald-500" />

                <span className="text-xs uppercase tracking-[0.2em] text-mist-600">
                  {t.projectDetails.resultsLabel}
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-5xl text-mist-100">
                  {t.projectDetails.results}
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05]">
              {project.results.map((result, index) => (
                <div
                  key={result.label}
                  data-reveal
                  className="
                    group
                    relative
                    min-h-[190px]
                    bg-ink-950/90
                    p-7 md:p-9
                    flex flex-col justify-between
                    overflow-hidden
                    transition-colors duration-500
                    hover:bg-white/[0.025]
                  "
                >
                  <span className="text-xs tracking-[0.15em] text-mist-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="font-display text-4xl md:text-5xl text-mist-100 mb-2 transition-colors duration-300 group-hover:text-emerald-400">
                      {result.value}
                    </p>

                    <p className="text-sm text-mist-600">
                      {result.label}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          GALLERY
      ===================================================== */}
      {project.gallery?.length > 0 && (
        <section className="relative py-24 md:py-32">
          <div className="container-devora">
            <div
              data-reveal
              className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-8 bg-emerald-500" />

                  <span className="text-xs uppercase tracking-[0.2em] text-mist-600">
                    {t.projectDetails.showcaseLabel}
                  </span>
                </div>

                <h2 className="font-display text-3xl md:text-5xl text-mist-100">
                  {t.projectDetails.gallery}
                </h2>
              </div>

              <p className="text-sm text-mist-600 max-w-xs">
                {project.name}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={image}
                  data-reveal
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border border-white/[0.07]
                    bg-ink-900
                    ${
                      index === 0
                        ? "md:col-span-2 aspect-[16/8]"
                        : "aspect-[4/3]"
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`${project.name} ${index + 1}`}
                    className="
                      w-full h-full
                      object-cover
                      transition-transform duration-1000
                      group-hover:scale-[1.035]
                    "
                    loading="lazy"
                  />

                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-ink-950/50
                      via-transparent
                      to-transparent
                      opacity-60
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-5 left-5
                      h-9 min-w-9
                      px-3
                      flex items-center justify-center
                      rounded-full
                      border border-white/10
                      bg-ink-950/60
                      backdrop-blur-xl
                      text-xs
                      text-mist-400
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          PROJECT NAVIGATION
      ===================================================== */}
      {(previous || next) && (
        <section className="relative border-t border-white/[0.06] py-16 md:py-20">
          <div className="container-devora">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Previous */}
              {previous ? (
                <ProjectNavCard
                  project={previous}
                  direction="previous"
                  label={t.projectDetails.prev}
                />
              ) : (
                <div />
              )}

              {/* Next */}
              {next && (
                <ProjectNavCard
                  project={next}
                  direction="next"
                  label={t.projectDetails.next}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

/* =========================================================
   META ITEM
========================================================= */

function MetaItem({ label, value }) {
  if (!value) return null;

  return (
    <div className="py-4 border-b border-white/[0.06] first:pt-0 last:border-b-0">
      <p className="text-[10px] uppercase tracking-[0.18em] text-mist-600 mb-2">
        {label}
      </p>

      <p className="text-sm md:text-base text-mist-100">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   CONTENT BLOCK
========================================================= */

function ContentBlock({ number, title, text }) {
  return (
    <div data-reveal>
      <div className="flex items-center gap-4 mb-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] text-xs text-emerald-400">
          {number}
        </span>

        <span className="h-px flex-1 bg-white/[0.06]" />
      </div>

      <h3 className="font-display text-2xl md:text-4xl text-mist-100 mb-5">
        {title}
      </h3>

      <p className="text-mist-400 text-base md:text-lg leading-[1.9] max-w-3xl">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   PROJECT NAV CARD
========================================================= */

function ProjectNavCard({ project, direction, label }) {
  const isNext = direction === "next";

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-white/[0.07]
        bg-white/[0.02]
        p-6 md:p-8
        transition-all duration-500
        hover:border-emerald-500/25
        hover:bg-white/[0.035]
        ${
          isNext
            ? "sm:text-right"
            : "sm:text-left"
        }
      `}
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute -top-20
          h-40 w-40
          rounded-full
          bg-emerald-500/[0.07]
          blur-[60px]
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          right-0
        "
      />

      <div
        className={`
          relative flex items-center gap-2
          text-xs text-mist-600 mb-4
          ${isNext ? "sm:justify-end" : ""}
        `}
      >
        {!isNext && (
          <ArrowLeft
            size={14}
            className="
              rtl:-scale-x-100
              transition-transform duration-300
              group-hover:-translate-x-1
              rtl:group-hover:translate-x-1
            "
          />
        )}

        <span>{label}</span>

        {isNext && (
          <ArrowUpRight
            size={14}
            className="
              rtl:-scale-x-100
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        )}
      </div>

      <p className="relative font-display text-2xl md:text-3xl text-mist-100 transition-colors duration-300 group-hover:text-emerald-400">
        {project.name}
      </p>

      <div
        className={`
          relative mt-6 h-px w-10 bg-emerald-500/30
          transition-all duration-500
          group-hover:w-20
          ${isNext ? "sm:ml-auto" : ""}
        `}
      />
    </Link>
  );
}
