import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { deleteProjectImage } from "../../lib/supabaseClient.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

export default function ProjectsManager() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error) setProjects(data ?? []);
    setLoading(false);
  }

  async function togglePublish(project) {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, is_published: !p.is_published } : p))
    );
    await supabase
      .from("projects")
      .update({ is_published: !project.is_published })
      .eq("id", project.id);
  }

  async function handleDelete(project) {
    if (!confirm(t.admin.deleteProjectConfirm.replace("{name}", project.name))) return;

    setProjects((prev) => prev.filter((p) => p.id !== project.id));

    // امسح الصور المرتبطة من الـ storage
    await Promise.all([
      deleteProjectImage(project.hero_image),
      ...(project.gallery ?? []).map((img) => deleteProjectImage(img)),
    ]).catch(() => {});

    await supabase.from("projects").delete().eq("id", project.id);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-emerald-500" />
            <span className="text-xs uppercase tracking-[0.2em] text-mist-600">
              {t.admin.manageProjects}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-mist-100">{t.admin.projects}</h1>
        </div>

        <Link
          to="/admin/projects/new"
          className="
            group flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3
            text-sm font-semibold text-ink-950
            transition-all duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20
          "
        >
          <Plus size={16} />
          {t.admin.newProject}
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-mist-600">{t.admin.loading}</p>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-14 text-center">
          <p className="text-mist-500 mb-5">{t.admin.noProjects}</p>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-ink-950"
          >
            <Plus size={15} />
            {t.admin.addFirstProject}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                flex flex-col sm:flex-row sm:items-center gap-4
                rounded-2xl border border-white/[0.07] bg-white/[0.02]
                p-4 md:p-5
                transition-all duration-300 hover:border-white/[0.14]
              "
            >
              <div
                className={`h-20 w-full sm:w-32 shrink-0 rounded-xl bg-gradient-to-br ${
                  project.gradient || "from-emerald-500/20 to-ink-900"
                } bg-cover bg-center overflow-hidden`}
                style={
                  project.hero_image
                    ? { backgroundImage: `url(${project.hero_image})` }
                    : undefined
                }
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-mist-100 font-medium truncate">{project.name}</p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${
                      project.is_published
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/[0.06]"
                        : "border-white/10 text-mist-600"
                    }`}
                  >
                    {project.is_published ? t.admin.published : t.admin.draft}
                  </span>
                </div>
                <p className="text-xs text-mist-600 truncate">
                  {project.category} · {project.slug}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 text-mist-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors duration-300"
                    title={t.admin.visitLink}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}

                <button
                  onClick={() => togglePublish(project)}
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 text-mist-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors duration-300"
                  title={project.is_published ? t.admin.hide : t.admin.publish}
                >
                  {project.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>

                <Link
                  to={`/admin/projects/${project.id}`}
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 text-mist-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors duration-300"
                  title={t.admin.edit}
                >
                  <Pencil size={14} />
                </Link>

                <button
                  onClick={() => handleDelete(project)}
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 text-mist-500 hover:text-red-400 hover:border-red-500/30 transition-colors duration-300"
                  title={t.admin.delete}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
