
import { createServerSupabaseClient } from "../supabase/server";


export async function getBlogBySlugQuery(slug: string, lang: string) {
    const supabase = await createServerSupabaseClient()
  return supabase
    .from("posts")
    .select(`
      id,
      published_at,
      profiles!inner(full_name, profile_url, role),
      categories!inner(name, slug),
      post_translations!inner(
        title,
        content,
        image,
        excerpt,
        slug,
        language,
        meta_title,
        meta_description
      )
    `)
    .eq("status", "published")
    .eq("post_translations.slug", slug)
    .eq("post_translations.language", lang)
    .single();
}

export async function getRelatedPostsQuery(
  category: string,
  lang: string,
  slug: string
) {
    const supabase = await createServerSupabaseClient()

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
    .eq("status", "published")
    .eq("categories.slug", category)
    .eq("post_translations.language", lang)
    .neq("post_translations.slug", slug)
    .limit(4);
}

export async function getTrendingQuery(lang: string) {
    const supabase = await createServerSupabaseClient()

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
    .limit(6);
}