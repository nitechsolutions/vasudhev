// lib/services/getHomeData.ts

import { createServerSupabaseClient } from "../supabase/server";
import { CategoryData, HomeData, PostItem } from "../types/post";
import { getDefaultLanguage } from "./language.service";

export async function getHomeData(lang?: string):Promise<HomeData> {
  const supabase = await createServerSupabaseClient();

  const defaultLang = await getDefaultLanguage();

  const languageCode = lang || defaultLang

  console.log("language", languageCode);
  

  const { data: categories } = await supabase
    .from("categories")
    .select("id, slug, name, emoji")
    .eq("language_code", languageCode);

  const format = (rows: any[] | null): PostItem[] =>
    (rows || []).map((post) => ({
      title: post.post_translations?.[0]?.title,
      slug: post.post_translations?.[0]?.slug,
      image: post.post_translations?.[0]?.image,
      excerpt: post.post_translations?.[0]?.excerpt,
      category: post.categories?.slug,
    }));

  const { data: featuredRaw } = await supabase
    .from("posts")
    .select(`
      id,
      categories!inner(slug),
      post_translations!inner(title, slug, image, excerpt, language)
    `)
    .eq("featured", true)
    .eq("post_translations.language", languageCode)
    .limit(4);

  const { data: trendingRaw } = await supabase
    .from("posts")
    .select(`
      id,
      categories!inner(slug),
      post_translations!inner(title, slug, image, language)
    `)
    .eq("trending", true)
    .eq("post_translations.language", languageCode)
    .limit(4);

  const categoryData: CategoryData[] = await Promise.all(
    (categories || []).map(async (cat) => {
      const { data } = await supabase
        .from("posts")
        .select(`
          id,
          categories!inner(slug),
          post_translations!inner(title, slug, image, language)
        `)
        .eq("categories.slug", cat.slug)
        .eq("post_translations.language", languageCode)
        .limit(4);

      return {
        slug: cat.slug,
        name: cat.name,
        emoji: cat.emoji,
        posts: format(data),
      };
    })
  );

  return {
    featured: format(featuredRaw),
    trending: format(trendingRaw),
    categoryData,
    lang: languageCode,
    defaultLang,
  };
}