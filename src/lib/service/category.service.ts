import { createServerSupabaseClient } from "../supabase/server";
import { getCategoryPostsQuery, getTrendingPostsQuery } from "./category.query";

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

export async function getCategoryPosts({
  lang,
  category,
  page,
  limit,
}: {
  lang: string;
  category: string;
  page: number;
  limit: number;
}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  

  const { data, count } = await getCategoryPostsQuery({
    lang,
    category,
    from,
    to,
  });

  const posts =
    data?.map((p: any) => ({
      title: p.post_translations[0]?.title,
      slug: p.post_translations[0]?.slug,
      image: p.post_translations[0]?.image,
      excerpt: p.post_translations[0]?.excerpt,
      category: p.categories.slug,
      emoji: p.categories.emoji,
    })) || [];

  return {
    posts,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getTrendingPosts(lang: string) {
  const { data } = await getTrendingPostsQuery(lang);

  return (
    data?.map((p: any) => ({
      title: p.post_translations[0]?.title,
      slug: p.post_translations[0]?.slug,
      image: p.post_translations[0]?.image,
      category: p.categories.slug,
    })) || []
  );
}