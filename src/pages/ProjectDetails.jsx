import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { getProjectBySlug, getAdjacentProjects } from "../data/projectdetails.js";

export default function ProjectDetails() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const project = getProjectBySlug(slug, lang);

  const revealRef = useScrollReveal("[data-reveal]", { y: 40, stagger: 0.1 });

  if (!project) return <Navigate to="/" replace />;

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <article className="bg-ink-950 min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="container-devora relative" ref={revealRef}>
          <Link
            to="/#projects"
            data-reveal
            className="inline-flex items-center gap-2 text-mist-500 hover:text-emerald-400 transition-colors mb-10 group"
          >
            <ArrowLeft
              size={16}
              className="rtl:-scale-x-100 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
            />
            {t.projectDetails.back}
          </Link>

          <p className="section-label mb-6" data-reveal>
            {project.index} — {project.category}
          </p>

          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl text-mist-100 mb-8"
            data-reveal
          >
            {project.name}
          </h1>

          <p
            className="text-mist-400 text-lg max-w-2xl leading-relaxed"
            data-reveal
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-8" data-reveal>
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs rounded-full border border-white/10 text-mist-400 px-4 py-1.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="container-devora -mt-8 md:-mt-16 relative z-10">
        <div
          data-reveal
          className="rounded-3xl overflow-hidden border border-white/[0.06] aspect-[16/9] bg-ink-900"
        >
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* META + CHALLENGE/SOLUTION */}
      <section className="py-24 md:py-32">
        <div className="container-devora grid md:grid-cols-3 gap-12">
          {/* Sidebar meta */}
          <div className="space-y-8" data-reveal>
            <MetaItem label={t.projectDetails.client} value={project.client} />
            <MetaItem label={t.projectDetails.year} value={project.year} />
            <MetaItem label={t.projectDetails.role} value={project.role} />
            <MetaItem label={t.projectDetails.duration} value={project.duration} />

            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {t.projectDetails.visit}
                <ExternalLink size={16} className="rtl:-scale-x-100" />
              </a>
            )}
          </div>

          {/* Challenge / Solution */}
          <div className="md:col-span-2 space-y-16">
            <div data-reveal>
              <h3 className="font-display text-2xl text-mist-100 mb-4">
                {t.projectDetails.challenge}
              </h3>
              <p className="text-mist-400 leading-relaxed">{project.challenge}</p>
            </div>

            <div data-reveal>
              <h3 className="font-display text-2xl text-mist-100 mb-4">
                {t.projectDetails.solution}
              </h3>
              <p className="text-mist-400 leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      {project.results?.length > 0 && (
        <section className="py-20 border-t border-white/[0.06]">
          <div className="container-devora grid sm:grid-cols-3 gap-8">
            {project.results.map((r) => (
              <div key={r.label} data-reveal className="text-center sm:text-start">
                <p className="font-display text-4xl sm:text-5xl text-emerald-400 mb-2">
                  {r.value}
                </p>
                <p className="text-mist-500 text-sm">{r.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {project.gallery?.length > 0 && (
        <section className="py-24">
          <div className="container-devora grid md:grid-cols-2 gap-6">
            {project.gallery.map((img, i) => (
              <div
                key={img}
                data-reveal
                className={`rounded-3xl overflow-hidden border border-white/[0.06] ${
                  i === 0 ? "md:col-span-2 aspect-[16/8]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={img}
                  alt={`${project.name} ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEXT PROJECT NAV */}
      {(previous || next) && (
        <section className="border-t border-white/[0.06] py-16">
        <div className="container-devora grid sm:grid-cols-2 gap-6">
          {previous && (
            <Link
              to={`/projects/${previous.slug}`}
              className="group p-8 rounded-3xl border border-white/[0.06] hover:border-emerald-500/30 transition-colors"
            >
              <p className="text-mist-500 text-sm mb-2">
                {t.projectDetails.prev}
              </p>
              <p className="font-display text-2xl text-mist-100 flex items-center gap-2">
                {previous.name}
              </p>
            </Link>
          )}

          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="group p-8 rounded-3xl border border-white/[0.06] hover:border-emerald-500/30 transition-colors text-end"
            >
              <p className="text-mist-500 text-sm mb-2">
                {t.projectDetails.next}
              </p>
              <p className="font-display text-2xl text-mist-100 flex items-center justify-end gap-2">
                {next.name}
                <ArrowUpRight
                  size={20}
                  className="rtl:-scale-x-100 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </p>
            </Link>
          )}
        </div>
        </section>
      )}
    </article>
  );
}

function MetaItem({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-mist-600 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-mist-100">{value}</p>
    </div>
  );
}