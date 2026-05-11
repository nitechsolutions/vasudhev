import { supabase } from "@/lib/supabase/client";

export async function getSitemapPosts() {
  const { data, error } = await supabase
        .from("posts")
    .select(`
      updated_at,
      categories (slug),
      post_translations (
        slug
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("SITEMAP ERROR:", error);
    return [];
  }

  return (data || []).map((post) => ({
    ...post,
    categories: Array.isArray(post.categories)
      ? post.categories[0] || null
      : post.categories || null,
  }));
}