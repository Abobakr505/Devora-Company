import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    "Supabase env vars مفقودة. تأكد إنك عامل ملف .env فيه VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// اسم الـ bucket المستخدم لتخزين صور المشاريع
export const PROJECT_IMAGES_BUCKET = "project-images";

/**
 * يرفع ملف صورة على Supabase Storage ويرجّع الرابط العام.
 * @param {File} file
 * @param {string} folder - مثلاً slug المشروع، عشان تتنظم الصور
 */
export async function uploadProjectImage(file, folder = "misc") {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

/** يحذف صورة من الـ storage باستخدام رابطها العام */
export async function deleteProjectImage(publicUrl) {
  if (!publicUrl) return;
  const marker = `/object/public/${PROJECT_IMAGES_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;
  const path = publicUrl.slice(idx + marker.length);
  await supabase.storage.from(PROJECT_IMAGES_BUCKET).remove([path]);
}