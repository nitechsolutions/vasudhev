import { createServerSupabaseClient } from "../supabase/server";

type CategoryItem = {
  name: string;
  slug: string;
  language_code: string;
  emoji: string;
};

export async function getCategoriesByLang(lang: string) : Promise<CategoryItem[]> {
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

  return data ?? [];
}