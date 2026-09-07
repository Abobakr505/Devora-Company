import { supabase } from "../lib/supabaseClient.js";

/** يختار الحقل بالعربي لو اللغة عربي ومتاح، وإلا يرجع الإنجليزي */
function localize(project, lang) {
  const ar = lang === "ar";
  return {
    ...project,
    name: (ar && project.name_ar) || project.name,
    description: (ar && project.description_ar) || project.description,
    challenge: (ar && project.challenge_ar) || project.challenge,
    solution: (ar && project.solution_ar) || project.solution,
    index: project.index_label,
    heroImage: project.hero_image,
    links: { live: project.live_url },
  };
}

/** يجيب كل المشاريع المنشورة، مرتبة حسب sort_order */
export async function getProjects(lang = "en") {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getProjects error:", error.message);
    return [];
  }

  return (data ?? []).map((p) => localize(p, lang));
}

/** يجيب مشروع واحد بالـ slug */
export async function getProjectBySlug(slug, lang = "en") {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;

  return localize(data, lang);
}

/** يجيب المشروع السابق والتالي حسب الترتيب، لصفحة تفاصيل المشروع */
export async function getAdjacentProjects(slug, lang = "en") {
  const { data, error } = await supabase
    .from("projects")
    .select("id, slug, name, name_ar, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return { previous: null, next: null };

  const index = data.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };

  const localizeNav = (p) =>
    p ? { ...p, name: (lang === "ar" && p.name_ar) || p.name } : null;

  return {
    previous: localizeNav(data[index - 1]),
    next: localizeNav(data[index + 1]),
  };
}