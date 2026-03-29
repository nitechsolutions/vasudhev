import { createServerSupabaseClient } from "../supabase/server";


export async function getCategoriesByLang(lang: string) {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("categories")
    .select(`
      name,
      language_code,
      slug,
      emoji
    `)
    .eq("language_code", lang);

  return data;
}