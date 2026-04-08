import { createServerSupabaseClient } from "../supabase/server";


export async function getCategoryPostsQuery({
  lang,
  category,
  from,
  to,
}: {
  lang: string;
  category: string;
  from: number;
  to: number;
}) {

    const supabase = await createServerSupabaseClient();
  return supabase
    .from("posts")
    .select(
      `
      id,
      published_at,
      categories!inner(slug, emoji),
      post_translations!inner(
        title,
        slug,
        image,
        excerpt,
        language
      )
    `,
      { count: "exact" }
    )
    .eq("status", "published")
    .eq("categories.slug", category)
    .eq("post_translations.language", lang)
    .order("published_at", { ascending: false })
    .range(from, to);
}

export async function getTrendingPostsQuery(lang: string) {
    const supabase = await createServerSupabaseClient();

  return supabase
    .from("posts")
    .select(`
      categories!inner(slug),
      post_translations!inner(
        title,
        slug,
        image,
        language
      )
    `)
    .eq("trending", true)
    .eq("status", "published")
    .eq("post_translations.language", lang)
    .limit(5);
}