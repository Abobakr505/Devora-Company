import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowRight, UploadCloud, X, Plus, Loader2 } from "lucide-react";
import { supabase, uploadProjectImage, deleteProjectImage } from "../../lib/supabaseClient.js";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const emptyProject = {
  slug: "",
  name: "",
  name_ar: "",
  category: "",
  index_label: "",
  description: "",
  description_ar: "",
  challenge: "",
  challenge_ar: "",
  solution: "",
  solution_ar: "",
  client: "",
  year: "",
  role: "",
  duration: "",
  tech: [],
  gradient: "from-emerald-500/20 to-ink-900",
  hero_image: "",
  gallery: [],
  results: [],
  live_url: "",
  is_published: true,
};

const GRADIENT_OPTIONS = [
  "from-emerald-500/20 to-ink-900",
  "from-sky-500/20 to-ink-900",
  "from-violet-500/20 to-ink-900",
  "from-amber-500/20 to-ink-900",
  "from-rose-500/20 to-ink-900",
];

function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function ProjectForm() {
  const { t } = useLanguage();
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();

  const [project, setProject] = useState(emptyProject);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;

    async function loadProject() {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
      if (!error && data) setProject(data);
      setLoading(false);
    }
    loadProject();
  }, [id, isNew]);

  function update(key, value) {
    setProject((p) => ({ ...p, [key]: value }));
  }

  function handleNameChange(value) {
    update("name", value);
    if (!slugManuallyEdited) update("slug", slugify(value));
  }

  function addTech() {
    const value = techInput.trim();
    if (!value || project.tech.includes(value)) return;
    update("tech", [...project.tech, value]);
    setTechInput("");
  }

  function removeTech(tech) {
    update("tech", project.tech.filter((t) => t !== tech));
  }

  function addResult() {
    update("results", [...(project.results ?? []), { value: "", label: "" }]);
  }

  function updateResult(index, key, value) {
    const next = [...project.results];
    next[index] = { ...next[index], [key]: value };
    update("results", next);
  }

  function removeResult(index) {
    update("results", project.results.filter((_, i) => i !== index));
  }

  async function handleHeroUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHero(true);
    try {
      const url = await uploadProjectImage(file, project.slug || "misc");
      if (project.hero_image) deleteProjectImage(project.hero_image).catch(() => {});
      update("hero_image", url);
    } catch (err) {
      setErrorMsg(t.admin.uploadFailed.replace("{message}", err.message));
    }
    setUploadingHero(false);
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(
        files.map((file) => uploadProjectImage(file, project.slug || "misc"))
      );
      update("gallery", [...(project.gallery ?? []), ...urls]);
    } catch (err) {
      setErrorMsg(t.admin.uploadFailed.replace("{message}", err.message));
    }
    setUploadingGallery(false);
  }

  function removeGalleryImage(url) {
    update("gallery", project.gallery.filter((g) => g !== url));
    deleteProjectImage(url).catch(() => {});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!project.slug || !project.name || !project.description || !project.category) {
      setErrorMsg(t.admin.requiredFields);
      return;
    }

    setSaving(true);

    const payload = { ...project };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;

    const query = isNew
      ? supabase.from("projects").insert(payload).select().single()
      : supabase.from("projects").update(payload).eq("id", id).select().single();

    const { error } = await query;

    setSaving(false);

    if (error) {
      setErrorMsg(t.admin.saveFailed.replace("{message}", error.message));
      return;
    }

    navigate("/admin/projects");
  }

  if (loading) {
    return <p className="text-sm text-mist-600">{t.admin.loading}</p>;
  }

  return (
    <div className="max-w-4xl">
      <Link
        to="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-mist-500 hover:text-emerald-400 transition-colors duration-300 mb-6"
      >
        <ArrowRight size={15} className="rtl:-scale-x-100" />
        {t.admin.backToProjects}
      </Link>

      <h1 className="font-display text-3xl md:text-4xl text-mist-100 mb-8">
        {isNew ? t.admin.newProjectTitle : t.admin.editProjectTitle.replace("{name}", project.name)}
      </h1>

      {errorMsg && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* بيانات أساسية */}
        <Section title={t.admin.basicInfo}>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t.admin.projectName}>
              <input
                required
                value={project.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="input"
              />
            </Field>

            <Field label={t.admin.slug}>
              <input
                required
                value={project.slug}
                onChange={(e) => {
                  setSlugManuallyEdited(true);
                  update("slug", slugify(e.target.value));
                }}
                className="input"
                dir="ltr"
              />
            </Field>

            <Field label={t.admin.category}>
              <input
                required
                value={project.category}
                onChange={(e) => update("category", e.target.value)}
                placeholder={t.admin.categoryPlaceholder}
                className="input"
              />
            </Field>

            <Field label={t.admin.sortIndex}>
              <input
                value={project.index_label}
                onChange={(e) => update("index_label", e.target.value)}
                className="input"
                dir="ltr"
              />
            </Field>

            <Field label={t.admin.client}>
              <input
                value={project.client}
                onChange={(e) => update("client", e.target.value)}
                className="input"
              />
            </Field>

            <Field label={t.admin.year}>
              <input
                value={project.year}
                onChange={(e) => update("year", e.target.value)}
                className="input"
              />
            </Field>

            <Field label={t.admin.role}>
              <input
                value={project.role}
                onChange={(e) => update("role", e.target.value)}
                className="input"
              />
            </Field>

            <Field label={t.admin.duration}>
              <input
                value={project.duration}
                onChange={(e) => update("duration", e.target.value)}
                className="input"
              />
            </Field>

            <Field label={t.admin.liveUrl}>
              <input
                value={project.live_url}
                onChange={(e) => update("live_url", e.target.value)}
                className="input"
                dir="ltr"
                placeholder="https://..."
              />
            </Field>

            <Field label={t.admin.gradient}>
              <select
                value={project.gradient}
                onChange={(e) => update("gradient", e.target.value)}
                className="input"
              >
                {GRADIENT_OPTIONS.map((g) => (
                  <option key={g} value={g} className="bg-ink-900">
                    {g}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Section>

        {/* نصوص */}
        <Section title={t.admin.content}>
          <Field label={t.admin.description}>
            <textarea
              required
              rows={3}
              value={project.description}
              onChange={(e) => update("description", e.target.value)}
              className="input resize-none"
            />
          </Field>

          <Field label={t.admin.challenge}>
            <textarea
              rows={3}
              value={project.challenge}
              onChange={(e) => update("challenge", e.target.value)}
              className="input resize-none"
            />
          </Field>

          <Field label={t.admin.solution}>
            <textarea
              rows={3}
              value={project.solution}
              onChange={(e) => update("solution", e.target.value)}
              className="input resize-none"
            />
          </Field>
        </Section>

        {/* التقنيات */}
        <Section title={t.admin.technologies}>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-mist-300"
              >
                {tech}
                <button type="button" onClick={() => removeTech(tech)}>
                  <X size={12} className="text-mist-600 hover:text-red-400" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTech();
                }
              }}
              placeholder="e.g. React"
              className="input flex-1"
              dir="ltr"
            />
            <button
              type="button"
              onClick={addTech}
              className="rounded-xl border border-white/10 px-4 text-mist-300 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors duration-300"
            >
              {t.admin.add}
            </button>
          </div>
        </Section>

        {/* النتائج */}
        <Section title={t.admin.resultsOptional}>
          <div className="space-y-3">
            {(project.results ?? []).map((result, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  value={result.value}
                  onChange={(e) => updateResult(i, "value", e.target.value)}
                  placeholder={t.admin.resultValue}
                  className="input flex-1"
                  dir="ltr"
                />
                <input
                  value={result.label}
                  onChange={(e) => updateResult(i, "label", e.target.value)}
                  placeholder={t.admin.resultDescription}
                  className="input flex-1"
                />
                <button type="button" onClick={() => removeResult(i)}>
                  <X size={16} className="text-mist-600 hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addResult}
            className="mt-4 flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={14} />
            {t.admin.addResult}
          </button>
        </Section>

        {/* الصور */}
        <Section title={t.admin.heroImage}>
          <ImageUploader
            uploading={uploadingHero}
            onUpload={handleHeroUpload}
            preview={project.hero_image}
            onRemove={() => update("hero_image", "")}
          />
        </Section>

        <Section title={t.admin.gallery}>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {(project.gallery ?? []).map((img) => (
              <div key={img} className="relative group rounded-xl overflow-hidden aspect-video border border-white/10">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(img)}
                  className="absolute top-2 left-2 h-7 w-7 flex items-center justify-center rounded-full bg-ink-950/80 text-mist-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
          <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-6 text-sm text-mist-500 cursor-pointer hover:border-emerald-500/30 hover:text-emerald-400 transition-colors duration-300">
            {uploadingGallery ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UploadCloud size={16} />
            )}
            {uploadingGallery ? t.admin.uploading : t.admin.addGalleryImages}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
              disabled={uploadingGallery}
            />
          </label>
        </Section>

        {/* حالة النشر */}
        <div className="flex items-center gap-3">
          <input
            id="is_published"
            type="checkbox"
            checked={project.is_published}
            onChange={(e) => update("is_published", e.target.checked)}
            className="h-4 w-4 rounded accent-emerald-500"
          />
          <label htmlFor="is_published" className="text-sm text-mist-300">
            {t.admin.publishedOnSite}
          </label>
        </div>

        {/* حفظ */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
          <button
            type="submit"
            disabled={saving}
            className="
              inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5
              text-sm font-semibold text-ink-950
              transition-all duration-300 hover:bg-emerald-400 disabled:opacity-60
            "
          >
            {saving && <Loader2 size={15} className="animate-spin" />}
            {saving ? t.admin.saving : isNew ? t.admin.addProject : t.admin.saveChanges}
          </button>

          <Link to="/admin/projects" className="text-sm text-mist-500 hover:text-mist-300">
            {t.admin.cancel}
          </Link>
        </div>
      </form>
    </div>
  );
}

/* ================= UI helpers ================= */

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-7">
      <h2 className="text-sm uppercase tracking-[0.15em] text-emerald-500/80 mb-5">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm text-mist-500 mb-2 block">{label}</label>
      {children}
    </div>
  );
}

function ImageUploader({ uploading, onUpload, preview, onRemove }) {
  const { t } = useLanguage();

  if (preview) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9] max-w-md group">
        <img src={preview} alt="" className="w-full h-full object-cover" />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 left-3 h-8 w-8 flex items-center justify-center rounded-full bg-ink-950/80 text-mist-300 hover:text-red-400"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-10 text-sm text-mist-500 cursor-pointer hover:border-emerald-500/30 hover:text-emerald-400 transition-colors duration-300 max-w-md">
      {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
      {uploading ? t.admin.uploading : t.admin.uploadHero}
      <input type="file" accept="image/*" onChange={onUpload} className="hidden" disabled={uploading} />
    </label>
  );
}
